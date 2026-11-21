// umum.js = data utama, ambil/kirim data ke PHP, dan fungsi bantuan (dipakai semua halaman)

// Mengambil data dari api.php (yang ambil dari database) lalu menampilkannya
// data awal masih kosong, nanti diisi dari PHP
var data = {
    nama: "",
    target: 0,
    aktivitas: [],
    berat: []
};


// nama-nama hari
var namaHari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];


// ---------- mengambil dan mengirim data ke PHP ----------

// ambil data dari PHP waktu aplikasi dibuka
function ambilData() {
    fetch("api.php?aksi=ambil")
        .then(function (jawaban) { return jawaban.json(); })
        .then(function (hasil) {
            if (hasil.error) { alert(hasil.error); return; }
            if (hasil.belumLogin) { tampilMasuk(hasil.pesan); return; }
            // sudah login (sesi masih ada): pastikan layar masuk disembunyikan
            document.getElementById("masuk").style.display = "none";
            data = hasil;
            tampilkan();
        });
}

// kirim data baru ke PHP supaya disimpan
function kirim(paket) {
    fetch("api.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: paket
    })
        .then(function (jawaban) { return jawaban.json(); })
        .then(function (hasil) {
            if (hasil.error) { alert(hasil.error); return; }
            if (hasil.belumLogin) { tampilMasuk(hasil.pesan); return; }
            data = hasil;
            tampilkan();
        });
}


// ---------- fungsi bantuan ----------

// mengubah tanggal menjadi teks, contoh: 2026-11-20
function buatTanggal(d) {
    var bulan = d.getMonth() + 1;
    var tgl = d.getDate();
    if (bulan < 10) { bulan = "0" + bulan; }
    if (tgl < 10) { tgl = "0" + tgl; }
    return d.getFullYear() + "-" + bulan + "-" + tgl;
}

// mengamankan teks buatan user (supaya tanda < > tidak dianggap kode HTML)
function amankan(teks) {
    return String(teks).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// cek apakah di tanggal itu ada olahraga
function adaLatihan(tanggal) {
    for (var i = 0; i < data.aktivitas.length; i++) {
        if (data.aktivitas[i].tanggal == tanggal) {
            return true;
        }
    }
    return false;
}

// menghitung hari berturut-turut sampai hari ini
function hitungStreak() {
    var d = new Date();
    var jumlah = 0;

    // kalau hari ini belum olahraga, mulai hitung dari kemarin
    if (adaLatihan(buatTanggal(d)) == false) {
        d.setDate(d.getDate() - 1);
    }

    while (adaLatihan(buatTanggal(d)) == true) {
        jumlah++;
        d.setDate(d.getDate() - 1);
    }
    return jumlah;
}

// mencari streak terbaik (dicek 1 tahun ke belakang)
function hitungTerbaik() {
    var terbaik = 0;
    var sekarang = 0;

    for (var i = 365; i >= 0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);

        if (adaLatihan(buatTanggal(d)) == true) {
            sekarang++;
            if (sekarang > terbaik) {
                terbaik = sekarang;
            }
        } else {
            sekarang = 0;
        }
    }
    return terbaik;
}
