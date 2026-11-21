// Kumpulan fungsi buat ngatur fitur login, daftar akun baru, sama reset password

// Fungsi buat munculin layar masuk (parameter 'pesan' boleh kosong kalo nggak ada notif)
function tampilMasuk(pesan) {
    document.getElementById("masuk").style.display = "flex"; // munculin popup/layar masuk
    document.getElementById("pesanMasuk").innerHTML = ""; // bersihin dulu teks pesan yang lama
    if (pesan) {
        // kalo ada pesan error atau info, tampilin ke layar
        document.getElementById("pesanMasuk").textContent = pesan;
    }
}

// Fungsi buat gonta-ganti tampilan antara form login, daftar, atau reset password
function tampilForm(nama) {
    // Cek parameter 'nama', cuma form yang dipilih aja yang dikasih display "block", sisanya diumpetin ("none")
    document.getElementById("formLogin").style.display = (nama == "login") ? "block" : "none";
    document.getElementById("formDaftar").style.display = (nama == "daftar") ? "block" : "none";
    document.getElementById("formReset").style.display = (nama == "reset") ? "block" : "none";

    // Ganti judul atas sesuai form yang lagi dibuka
    var judul = { login: "Masuk GAINFIT", daftar: "Daftar Akun", reset: "Reset Password" };
    document.getElementById("judulMasuk").innerHTML = judul[nama];
    document.getElementById("pesanMasuk").innerHTML = ""; // hapus pesan error pas pindah tab form

    // Biar form reset password selalu balik ke tahap 1 tiap kali baru dibuka
    document.getElementById("langkahReset").style.display = "none"; // umpetin inputan tahap 2
    document.getElementById("tombolReset").innerHTML = "Lanjut"; // balikin tulisan tombol jadi "Lanjut"
}

// Fungsi bantuan buat ngirim data form ke api.php pake metode POST, terus jalanin fungsi "selesai" kalo berhasil
function kirimAkun(paket, selesai) {
    fetch("api.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: paket
    })
        .then(function (jawaban) { return jawaban.json(); }) // ubah balesan dari PHP jadi format JSON
        .then(function (hasil) {
            if (hasil.error) { alert(hasil.error); return; } // kalo ada error dari server, munculin alert terus stop
            selesai(hasil); // kalo aman, lanjut jalanin fungsi berikutnya
        });
}

// Fungsi yang dipanggil kalo user udah berhasil login atau daftar
function suksesMasuk(hasil) {
    data = hasil; // simpen data user dari PHP ke variabel global 'data'
    document.getElementById("masuk").style.display = "none"; // tutup layar login
    // Kosongin lagi kolom password biar aman
    document.getElementById("loginPassword").value = "";
    document.getElementById("daftarPassword").value = "";
    pindahHalaman("beranda"); // arahin user ke halaman beranda
    tampilkan(); // tampilin data user di beranda
}

// Fungsi buat proses tombol Login
function proseLogin() {
    // Ambil email & password dari inputan, pake encodeURIComponent biar karakter aneh/spasi nggak ngerusak format data
    var paket = "aksi=login&email=" + encodeURIComponent(document.getElementById("loginEmail").value) +
                "&password=" + encodeURIComponent(document.getElementById("loginPassword").value);
    
    kirimAkun(paket, function (hasil) {
        // Kalo login gagal (misal password salah), tetep di layar masuk sambil nampilin pesannya
        if (hasil.belumLogin) { tampilMasuk(hasil.pesan); return; }
        suksesMasuk(hasil); // kalo bener, langsung masuk ke beranda
    });
}

// Fungsi buat proses tombol Daftar Akun
function prosesDaftar() {
    // Kumpulin semua data dari form pendaftaran (termasuk pertanyaan keamanan buat jaga-jaga kalo lupa password)
    var paket = "aksi=daftar&email=" + encodeURIComponent(document.getElementById("daftarEmail").value) +
                "&username=" + encodeURIComponent(document.getElementById("daftarUsername").value) +
                "&password=" + encodeURIComponent(document.getElementById("daftarPassword").value) +
                "&pertanyaan=" + encodeURIComponent(document.getElementById("daftarPertanyaan").value) +
                "&jawaban=" + encodeURIComponent(document.getElementById("daftarJawaban").value);
    
    kirimAkun(paket, function (hasil) {
        if (hasil.belumLogin) { tampilMasuk(hasil.pesan); return; } // kalo gagal daftar (misal email udah kepake), tampilin pesannya
        suksesMasuk(hasil); // kalo berhasil daftar, otomatis langsung masuk
    });
}

// Proses reset password dibagi jadi 2 langkah:
// Langkah 1: cek email & ambil pertanyaan keamanan | Langkah 2: kirim jawaban + password baru
function prosesReset() {
    var email = document.getElementById("resetEmail").value;

    // Cek dulu, kalo bagian 'langkahReset' masih keumpet berarti ini masih Langkah 1
    if (document.getElementById("langkahReset").style.display == "none") {
        kirimAkun("aksi=ambil_pertanyaan&email=" + encodeURIComponent(email), function (hasil) {
            if (!hasil.pertanyaan) { tampilMasuk(hasil.pesan); return; } // kalo email nggak ketemu, kasih notif
            
            // Kalo email ketemu, munculin pertanyaan keamanannya dan buka form Langkah 2
            document.getElementById("pesanMasuk").innerHTML = "";
            document.getElementById("resetPertanyaan").textContent = hasil.pertanyaan;
            document.getElementById("langkahReset").style.display = "block";
            document.getElementById("tombolReset").innerHTML = "Ganti Password"; // ubah teks tombol buat langkah berikutnya
        });
        return; // berenti di sini dulu, nunggu user ngisi jawaban
    }

    // Kalo 'langkahReset' udah kebuka, berarti user udah klik tombol buat jalanin Langkah 2
    var paket = "aksi=reset_password&email=" + encodeURIComponent(email) +
                "&jawaban=" + encodeURIComponent(document.getElementById("resetJawaban").value) +
                "&password_baru=" + encodeURIComponent(document.getElementById("resetPasswordBaru").value);
    
    kirimAkun(paket, function (hasil) {
        // Kalo balesan pesannya diawali kata "berhasil", bersihin inputan terus balikin ke form login
        if (hasil.pesan && hasil.pesan.indexOf("berhasil") == 0) {
            document.getElementById("resetJawaban").value = "";
            document.getElementById("resetPasswordBaru").value = "";
            tampilForm("login");
        }
        tampilMasuk(hasil.pesan); // tampilin notif berhasil/gagalnya
    });
}

// Fungsi buat logout / keluar dari akun
function keluar() {
    kirimAkun("aksi=keluar", function (hasil) {
        // Reset ulang data user jadi kosong lagi, terus balikin ke layar login
        data = { nama: "", target: 0, aktivitas: [], berat: [] };
        tampilForm("login");
        tampilMasuk("");
    });
}