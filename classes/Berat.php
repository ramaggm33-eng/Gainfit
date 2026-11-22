<?php
// Berat.php class untuk catatan berat badan
// tabel berat

class Berat
{
    private $db;

    public function __construct($koneksi)
    {
        $this->db = $koneksi;
    }

    // ambil semua catatan berat badan milik satu pengguna (urut dari yang paling lama)
    public function ambilSemua($idPengguna)
    {
        $q = $this->db->prepare("SELECT kg, tanggal FROM berat WHERE pengguna_id = ? ORDER BY id ASC");
        $q->execute(array($idPengguna));
        $hasil = $q->fetchAll(PDO::FETCH_ASSOC);

        for ($i = 0; $i < count($hasil); $i++) {
            $hasil[$i]["kg"] = (float)$hasil[$i]["kg"];
        }
        return $hasil;
    }

    // simpan berat badan baru (tanggalnya hari ini)
    public function simpan($idPengguna, $kg)
    {
        $q = $this->db->prepare("INSERT INTO berat (pengguna_id, kg, tanggal) VALUES (?, ?, ?)");
        $q->execute(array($idPengguna, $kg, date("Y-m-d")));
    }
}
?>
