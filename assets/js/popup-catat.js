// olahraga yang sedang dipilih
var jenisPilihan = "";

//pop-up catat olahraga
function bukaPopup(jenis) {
    jenisPilihan = jenis;
    document.getElementById("judulPopup").innerHTML = "Catat " + jenis;
    document.getElementById("inputMenit").value = "";
    document.getElementById("inputCatatan").value = "";
    document.getElementById("popup").style.display = "flex";
}

function tutupPopup() {
    // blur() = tutup keyboard di HP
    document.getElementById("inputMenit").blur();
    document.getElementById("inputCatatan").blur();
    document.getElementById("popup").style.display = "none";
}

function simpanAktivitas() {
    var menit = document.getElementById("inputMenit").value;

    // kalau kosong, isi dengan 0
    if (menit == "") { menit = 0; }

    var catatan = document.getElementById("inputCatatan").value;

    kirim("aksi=simpan_aktivitas&jenis=" + encodeURIComponent(jenisPilihan) + "&menit=" + menit +
          "&catatan=" + encodeURIComponent(catatan));
    tutupPopup();
}
