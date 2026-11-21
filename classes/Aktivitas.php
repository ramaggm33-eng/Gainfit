<?php
// Aktivitas.php = class untuk catatan olahraga
// (tabel: aktivitas)

class Aktivitas
{
    private $db;

    public function __construct($koneksi)
    {
        $this->db = $koneksi;
    }

    // ambil semua catatan olahraga milik satu pengguna (urut dari yang paling lama)
    public function ambilSemua($idPengguna)
    {
        $q = $this->db->prepare("SELECT jenis, menit, catatan, tanggal FROM aktivitas WHERE pengguna_id = ? ORDER BY id ASC");
        $q->execute(array($idPengguna));
        $hasil = $q->fetchAll(PDO::FETCH_ASSOC);

        // ubah teks dari database jadi angka
        for ($i = 0; $i < count($hasil); $i++) {
            $hasil[$i]["menit"] = (int)$hasil[$i]["menit"];
        }
        return $hasil;
    }

    // simpan olahraga baru (tanggalnya hari ini)
    public function simpan($idPengguna, $jenis, $menit, $catatan)
    {
        $q = $this->db->prepare("INSERT INTO aktivitas (pengguna_id, jenis, menit, catatan, tanggal) VALUES (?, ?, ?, ?, ?)");
        $q->execute(array($idPengguna, $jenis, $menit, $catatan, date("Y-m-d")));
    }
}
?>
