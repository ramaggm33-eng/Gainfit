//fitur pencarian
//menyaring kotak olahraga sesuai tulisan di kolom cari
function cariLatihan(idInput, idHalaman) {
    var kata = document.getElementById(idInput).value.toUpperCase();
    var kotak = document.getElementById(idHalaman).getElementsByClassName("kotak");

    for (var i = 0; i < kotak.length; i++) {
        var nama = kotak[i].getAttribute("data-jenis");
        if (nama.indexOf(kata) != -1) {
            kotak[i].style.display = "";
        } else {
            kotak[i].style.display = "none";
        }
    }
}
