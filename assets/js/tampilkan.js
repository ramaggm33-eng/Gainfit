// tampilkan.js = menampilkan data ke layar (Beranda, Laporan, dan Profil)

//menampilkan data ke layar
function tampilkan() {
    var hariIni = new Date();

    // cari hari Minggu di minggu ini
    var awal = new Date();
    awal.setDate(hariIni.getDate() - hariIni.getDay());

    var htmlBeranda = "";
    var htmlRiwayat = "";
    var jumlahMinggu = 0;

    // buat 7 tanggal (Minggu sampai Sabtu
    for (var i = 0; i < 7; i++) {
        var d = new Date(awal.getFullYear(), awal.getMonth(), awal.getDate() + i);
        var teks = buatTanggal(d);

        var kelas = "";
        if (teks == buatTanggal(hariIni)) {
            kelas = "hariini";
        }
        if (adaLatihan(teks) == true) {
            kelas = kelas + " sudah";
            jumlahMinggu++;
        }

        htmlBeranda += "<div class='" + kelas + "'>" + d.getDate() + "</div>";
        htmlRiwayat += "<div class='" + kelas + "'>" + namaHari[i] + "<br>" + d.getDate() + "</div>";
    }

    document.getElementById("tanggalBeranda").innerHTML = htmlBeranda;
    document.getElementById("tanggalRiwayat").innerHTML = htmlRiwayat;
    document.getElementById("target").innerHTML = jumlahMinggu + "/" + data.target;

    // ----- laporan: jumlah semua -----
    var totalMenit = 0;
    var daftar = "";

    for (var j = 0; j < data.aktivitas.length; j++) {
        var a = data.aktivitas[j];
        totalMenit = totalMenit + a.menit;

        // yang terbaru ditaruh paling atas
        var baris = "";
        if (a.catatan != "") {
            // ada catatan: garis bawah dipindah ke bawah catatan
            baris = "<div class='item' style='border-bottom:none'><span>" + a.tanggal + " - " + a.jenis + "</span><span>" +
                    a.menit + " mnt</span></div>" +
                    "<div class='catatan-item'>Catatan: " + amankan(a.catatan) + "</div>";
        } else {
            baris = "<div class='item'><span>" + a.tanggal + " - " + a.jenis + "</span><span>" +
                    a.menit + " mnt</span></div>";
        }
        daftar = baris + daftar;
    }

    if (daftar == "") {
        daftar = "Belum ada catatan.";
    }

    document.getElementById("totalLatihan").innerHTML = data.aktivitas.length;
    document.getElementById("totalMenit").innerHTML = totalMenit;
    document.getElementById("semuaCatatan").innerHTML = daftar;
    document.getElementById("tabAktivitas").innerHTML = daftar;

    document.getElementById("beruntun").innerHTML = hitungStreak();
    document.getElementById("terbaik").innerHTML = hitungTerbaik();

    // ----- laporan: berat badan -----
    var beratNow = 0;
    var beratMax = 0;
    var beratMin = 0;

    for (var k = 0; k < data.berat.length; k++) {
        var kg = data.berat[k].kg;
        beratNow = kg; // data terakhir = berat sekarang
        if (k == 0 || kg > beratMax) { beratMax = kg; }
        if (k == 0 || kg < beratMin) { beratMin = kg; }
    }

    document.getElementById("beratNow").innerHTML = beratNow;
    document.getElementById("beratMax").innerHTML = beratMax;
    document.getElementById("beratMin").innerHTML = beratMin;
    gambarGrafik();

    // ----- profil -----
    if (data.nama != "") {
        document.getElementById("nama").innerHTML = data.nama;
    } else {
        document.getElementById("nama").innerHTML = "Isi nama kamu";
    }
    document.getElementById("jumlahAktivitas").innerHTML = data.aktivitas.length;
    document.getElementById("streak").innerHTML = hitungStreak();

    // titik-titik bulan ini (1 titik = 1 hari)
    var jumlahHari = new Date(hariIni.getFullYear(), hariIni.getMonth() + 1, 0).getDate();
    var htmlTitik = "";

    for (var h = 1; h <= jumlahHari; h++) {
        var tgl = new Date(hariIni.getFullYear(), hariIni.getMonth(), h);
        if (adaLatihan(buatTanggal(tgl)) == true) {
            htmlTitik += "<i class='isi'></i>";
        } else {
            htmlTitik += "<i></i>";
        }
    }
    document.getElementById("titikBulan").innerHTML = htmlTitik;
}
