<?php
// GainfitController.php = "otak" aplikasi
// Menerima perintah (aksi) dari JavaScript, lalu menyuruh
// class Pengguna / Aktivitas / Berat bekerja.
// Login disimpan di session PHP ($_SESSION["id_pengguna"]).

require_once "Database.php";
require_once "Pengguna.php";
require_once "Aktivitas.php";
require_once "Berat.php";

class GainfitController
{
    private $pengguna;
    private $aktivitas;
    private $berat;

    public function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        $database = new Database();
        $this->pengguna = new Pengguna($database->koneksi);
        $this->aktivitas = new Aktivitas($database->koneksi);
        $this->berat = new Berat($database->koneksi);
    }

    // jalankan perintah sesuai "aksi"
    public function jalankan($aksi, $post)
    {
        // ----- perintah akun (boleh dijalankan tanpa login) -----
        if ($aksi == "daftar") {
            return $this->daftar($post);
        }
        if ($aksi == "login") {
            return $this->login($post);
        }
        if ($aksi == "ambil_pertanyaan") {
            return $this->ambilPertanyaan($post);
        }
        if ($aksi == "reset_password") {
            return $this->resetPassword($post);
        }
        if ($aksi == "keluar") {
            $_SESSION = array();
            session_destroy();
            return $this->belumLogin("");
        }

        // ----- selain itu wajib sudah login -----
        $id = (int)($_SESSION["id_pengguna"] ?? 0);
        if ($id == 0) {
            return $this->belumLogin("");
        }

        if ($aksi == "simpan_aktivitas") {
            $jenis = trim($post["jenis"] ?? "");
            $menit = (int)($post["menit"] ?? 0);
            $catatan = mb_substr(trim($post["catatan"] ?? ""), 0, 255);
            if ($jenis != "" && $menit >= 0) {
                $this->aktivitas->simpan($id, $jenis, $menit, $catatan);
            }
        }

        if ($aksi == "simpan_berat") {
            $kg = (float)($post["kg"] ?? 0);
            if ($kg > 0) {
                $this->berat->simpan($id, $kg);
            }
        }

        if ($aksi == "simpan_nama") {
            $this->pengguna->simpanNama($id, trim($post["nama"] ?? ""));
        }

        if ($aksi == "simpan_target") {
            $target = (int)($post["target"] ?? 0);
            if ($target >= 0) {
                $this->pengguna->simpanTarget($id, $target);
            }
        }

        return $this->ambilSemuaData($id);
    }

    // kumpulkan semua data milik pengguna jadi satu paket untuk JavaScript
    public function ambilSemuaData($id)
    {
        $p = $this->pengguna->ambil($id);

        return array(
            "nama" => $p["nama"],
            "target" => $p["target"],
            "aktivitas" => $this->aktivitas->ambilSemua($id),
            "berat" => $this->berat->ambilSemua($id)
        );
    }

    // ---------- fungsi akun ----------

    // jawaban untuk JavaScript: "belum login" + pesan (boleh kosong)
    private function belumLogin($pesan)
    {
        return array("belumLogin" => true, "pesan" => $pesan);
    }

    // Gmail dibuat huruf kecil, harus berakhiran @gmail.com
    private function rapikanEmail($post)
    {
        return strtolower(trim($post["email"] ?? ""));
    }

    private function emailValid($email)
    {
        return strlen($email) <= 100 && preg_match('/^[a-z0-9._+-]+@gmail\.com$/', $email) == 1;
    }

    // username = nama tampilan, boleh sama dengan orang lain (2-30 karakter: huruf, angka, spasi, . _ -)
    private function usernameValid($username)
    {
        return preg_match('/^[\p{L}\p{N} ._-]{2,30}$/u', $username) == 1;
    }

    private function daftar($post)
    {
        $email = $this->rapikanEmail($post);
        $username = trim($post["username"] ?? "");
        $password = $post["password"] ?? "";
        $pertanyaan = trim($post["pertanyaan"] ?? "");
        $jawaban = trim($post["jawaban"] ?? "");

        if (!$this->emailValid($email)) {
            return $this->belumLogin("Gmail harus berakhiran @gmail.com, contoh: namamu@gmail.com");
        }
        if (!$this->usernameValid($username)) {
            return $this->belumLogin("Username 2-30 karakter, hanya huruf, angka, spasi, titik, _ dan -");
        }
        if (strlen($password) < 8) {
            return $this->belumLogin("Password minimal 8 karakter");
        }
        if ($pertanyaan == "" || $jawaban == "") {
            return $this->belumLogin("Pertanyaan dan jawaban keamanan wajib diisi");
        }

        $id = $this->pengguna->daftar($email, $username, $password, $pertanyaan, $jawaban);
        if ($id == 0) {
            return $this->belumLogin("Gmail sudah terdaftar");
        }

        // langsung masuk setelah daftar
        session_regenerate_id(true);
        $_SESSION["id_pengguna"] = $id;
        return $this->ambilSemuaData($id);
    }

    private function login($post)
    {
        $email = $this->rapikanEmail($post);
        $id = $this->pengguna->login($email, $post["password"] ?? "");

        if ($id == 0) {
            return $this->belumLogin("Gmail atau password salah");
        }

        session_regenerate_id(true);
        $_SESSION["id_pengguna"] = $id;
        return $this->ambilSemuaData($id);
    }

    // langkah 1 reset password: tampilkan pertanyaan keamanan
    private function ambilPertanyaan($post)
    {
        $pertanyaan = $this->pengguna->ambilPertanyaan($this->rapikanEmail($post));
        if ($pertanyaan == "") {
            return $this->belumLogin("Gmail tidak ditemukan");
        }
        return array("belumLogin" => true, "pertanyaan" => $pertanyaan);
    }

    // langkah 2 reset password: cek jawaban lalu ganti password
    private function resetPassword($post)
    {
        $passwordBaru = $post["password_baru"] ?? "";
        if (strlen($passwordBaru) < 8) {
            return $this->belumLogin("Password baru minimal 8 karakter");
        }

        $berhasil = $this->pengguna->resetPassword(
            $this->rapikanEmail($post),
            $post["jawaban"] ?? "",
            $passwordBaru
        );
        if (!$berhasil) {
            return $this->belumLogin("Jawaban keamanan salah");
        }
        return $this->belumLogin("Password berhasil diganti, silakan masuk");
    }
}
?>
