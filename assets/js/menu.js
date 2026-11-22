//menu di bagian bawah
//Buat pindah halaman
function pindahHalaman(nama) {
    var semua = ["beranda", "pencarian", "laporan", "profil"];

    for (var i = 0; i < semua.length; i++) {
        // sembunyikan semua halaman
        document.getElementById(semua[i]).className = "halaman";
        document.getElementById("m-" + semua[i]).className = "";
    }

    // tampilkan halaman yang dipilih
    document.getElementById(nama).className = "halaman aktif-halaman";
    document.getElementById("m-" + nama).className = "menu-aktif";
}
