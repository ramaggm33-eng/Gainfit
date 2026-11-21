<?php
// =====================================================
// api.php = pintu masuk data (dipanggil oleh file di assets/js/)
// Tugasnya cuma: terima perintah -> panggil controller -> kirim JSON
// =====================================================

date_default_timezone_set("Asia/Jakarta");

require_once "classes/GainfitController.php";

// kalau tidak ada perintah "aksi", anggap perintahnya "ambil"
$aksi = $_REQUEST["aksi"] ?? "ambil";

$app = new GainfitController();
$hasil = $app->jalankan($aksi, $_POST);

header("Content-Type: application/json");
echo json_encode($hasil);
?>
