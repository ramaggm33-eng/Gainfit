//popup-isi.js pop-up isian (target / berat badan / nama)
//pop-up isian pengganti prompt, supaya keyboard HP bisa tertutup

// yang sedang diisi: "target", "berat", atau "nama"
var jenisIsi = "";

function bukaIsi(jenis, judul, label, nilai, tipe) {
    jenisIsi = jenis;
    document.getElementById("judulIsi").innerHTML = judul;
    document.getElementById("labelIsi").innerHTML = label;
    document.getElementById("inputIsi").type = tipe;
    document.getElementById("inputIsi").value = nilai;
    document.getElementById("popupIsi").style.display = "flex";
}

function tutupIsi() {
    document.getElementById("inputIsi").blur(); // tutup keyboard
    document.getElementById("popupIsi").style.display = "none";
}

function simpanIsi() {
    var nilai = document.getElementById("inputIsi").value.trim();

    if (jenisIsi == "target") {
        if (nilai == "" || isNaN(nilai) || Number(nilai) < 0) { return; }
        kirim("aksi=simpan_target&target=" + parseInt(nilai));
    }

    if (jenisIsi == "berat") {
        nilai = nilai.replace(",", "."); // koma jadi titik (67,5 -> 67.5)
        if (nilai == "" || isNaN(nilai) || Number(nilai) <= 0) { return; }
        kirim("aksi=simpan_berat&kg=" + nilai);
    }

    if (jenisIsi == "nama") {
        kirim("aksi=simpan_nama&nama=" + encodeURIComponent(nilai));
    }

    tutupIsi();
}
