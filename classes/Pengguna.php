<?php
// Pengguna.php = class untuk akun pengguna (login, daftar, reset password),
// nama dan target mingguan
// (tabel: pengguna)

class Pengguna
{
    private $db;

    public function __construct($koneksi)
    {
        $this->db = $koneksi;
    }

    // ambil data pengguna sesuai id
    public function ambil($id)
    {
        $q = $this->db->prepare("SELECT nama, target FROM pengguna WHERE id = ?");
        $q->execute(array($id));
        $hasil = $q->fetch(PDO::FETCH_ASSOC);

        // kalau barisnya tidak ada, kasih data kosong
        if (!$hasil) {
            $hasil = array("nama" => "", "target" => 0);
        }
        $hasil["target"] = (int)$hasil["target"];
        return $hasil;
    }

    // simpan nama
    public function simpanNama($id, $nama)
    {
        $q = $this->db->prepare("UPDATE pengguna SET nama = ? WHERE id = ?");
        $q->execute(array($nama, $id));
    }

    // simpan target mingguan
    public function simpanTarget($id, $target)
    {
        $q = $this->db->prepare("UPDATE pengguna SET target = ? WHERE id = ?");
        $q->execute(array($target, $id));
    }

    // ---------- akun ----------

    // buat akun baru, hasilnya id pengguna (atau 0 kalau Gmail sudah dipakai)
    public function daftar($email, $username, $password, $pertanyaan, $jawaban)
    {
        if ($this->idDariEmail($email) > 0) {
            return 0;
        }
        $q = $this->db->prepare(
            "INSERT INTO pengguna (email, username, nama, password, pertanyaan, jawaban) VALUES (?, ?, ?, ?, ?, ?)"
        );
        // username juga jadi nama awal di halaman Profil (bisa diganti lewat Edit Profil)
        $q->execute(array(
            $email,
            $username,
            $username,
            password_hash($password, PASSWORD_DEFAULT),
            $pertanyaan,
            password_hash($this->rapikanJawaban($jawaban), PASSWORD_DEFAULT)
        ));
        return (int)$this->db->lastInsertId();
    }

    // cek Gmail + password, hasilnya id pengguna (atau 0 kalau salah)
    public function login($email, $password)
    {
        $q = $this->db->prepare("SELECT id, password FROM pengguna WHERE email = ?");
        $q->execute(array($email));
        $baris = $q->fetch(PDO::FETCH_ASSOC);

        if ($baris && password_verify($password, $baris["password"])) {
            return (int)$baris["id"];
        }
        return 0;
    }

    // ambil pertanyaan keamanan milik Gmail (kosong kalau tidak ada)
    public function ambilPertanyaan($email)
    {
        $q = $this->db->prepare("SELECT pertanyaan FROM pengguna WHERE email = ?");
        $q->execute(array($email));
        $hasil = $q->fetchColumn();
        return $hasil ? $hasil : "";
    }

    // reset password kalau jawaban keamanan benar, hasilnya true / false
    public function resetPassword($email, $jawaban, $passwordBaru)
    {
        $q = $this->db->prepare("SELECT id, jawaban FROM pengguna WHERE email = ?");
        $q->execute(array($email));
        $baris = $q->fetch(PDO::FETCH_ASSOC);

        if (!$baris || !password_verify($this->rapikanJawaban($jawaban), $baris["jawaban"])) {
            return false;
        }

        $q = $this->db->prepare("UPDATE pengguna SET password = ? WHERE id = ?");
        $q->execute(array(password_hash($passwordBaru, PASSWORD_DEFAULT), $baris["id"]));
        return true;
    }

    // cari id dari Gmail (0 kalau tidak ada)
    private function idDariEmail($email)
    {
        $q = $this->db->prepare("SELECT id FROM pengguna WHERE email = ?");
        $q->execute(array($email));
        return (int)$q->fetchColumn();
    }

    // jawaban dibuat huruf kecil tanpa spasi di pinggir, supaya tidak rewel
    private function rapikanJawaban($jawaban)
    {
        return strtolower(trim($jawaban));
    }
}
?>
