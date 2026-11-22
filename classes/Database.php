<?php
// Database.php class untuk menyambung ke database MySQL
// Kalau username / password MySQL kamu beda, ubah di sini saja
class Database
{
    private $host = "localhost";
    private $namaDatabase = "gainfit";
    private $user = "root";
    private $password = "";

    // tempat menyimpan koneksi
    public $koneksi;

    // dijalankan otomatis waktu class dibuat (new Database())
    public function __construct()
    {
        try {
            $this->koneksi = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->namaDatabase . ";charset=utf8mb4",
                $this->user,
                $this->password
            );
            // supaya kalau ada error langsung kelihatan
            $this->koneksi->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            // kalau gagal nyambung, kirim pesan error ke JavaScript lalu berhenti
            http_response_code(500);
            header("Content-Type: application/json");
            echo json_encode(array("error" => "Gagal konek database: " . $e->getMessage()));
            exit;
        }
    }
}
?>
