// profil.js = fungsi halaman PROFIL: pindah tab, edit profil (tombol Keluar ada di login.js)

// pindah tab di halaman profil
function pindahTab(nama) {
    if (nama == "kemajuan") {
        document.getElementById("tabKemajuan").style.display = "flex";
        document.getElementById("tabAktivitas").style.display = "none";
        document.getElementById("tombolKemajuan").className = "tab-aktif";
        document.getElementById("tombolAktivitas").className = "";
    } else {
        document.getElementById("tabKemajuan").style.display = "none";
        document.getElementById("tabAktivitas").style.display = "block";
        document.getElementById("tombolKemajuan").className = "";
        document.getElementById("tombolAktivitas").className = "tab-aktif";
    }
}

function editProfil() {
    bukaIsi("nama", "Edit Profil", "Masukkan nama kamu", data.nama, "text");
}
