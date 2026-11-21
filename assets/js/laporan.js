//laporan.js = fungsi halaman LAPORAN: grafik berat badan, catat berat, semua catatan

//grafik berat badan
function gambarGrafik() {
    var kanvas = document.getElementById("grafik");
    var g = kanvas.getContext("2d");
    g.clearRect(0, 0, kanvas.width, kanvas.height);

    //garis-garis bantu
    g.strokeStyle = "rgba(255,255,255,0.4)";
    for (var y = 20; y < kanvas.height; y += 30) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(kanvas.width, y);
        g.stroke();
    }

    //butuh minimal 2 data supaya bisa dibuat garis
    if (data.berat.length < 2) {
        return;
    }

    //cari berat paling kecil dan paling besar
    var min = data.berat[0].kg;
    var max = data.berat[0].kg;
    for (var i = 0; i < data.berat.length; i++) {
        if (data.berat[i].kg < min) { min = data.berat[i].kg; }
        if (data.berat[i].kg > max) { max = data.berat[i].kg; }
    }
    if (min == max) { min = min - 1; max = max + 1; }

    //gambar garis berat badan
    //bantuan ai
    g.strokeStyle = "#e0249f";
    g.lineWidth = 3;
    g.beginPath();
    for (var j = 0; j < data.berat.length; j++) {
        var x = j * (kanvas.width / (data.berat.length - 1));
        var posisiY = kanvas.height - 10 - ((data.berat[j].kg - min) / (max - min)) * (kanvas.height - 20);
        if (j == 0) {
            g.moveTo(x, posisiY);
        } else {
            g.lineTo(x, posisiY);
        }
    }
    g.stroke();
}

function catatBerat() {
    bukaIsi("berat", "Catat Berat Badan", "Berat badan hari ini (kg)", "", "number");
    document.getElementById("inputIsi").step = "0.1";
}

function lihatSemua() {
    var kotak = document.getElementById("semuaCatatan");
    if (kotak.style.display == "none") {
        kotak.style.display = "block";
    } else {
        kotak.style.display = "none";
    }
}
