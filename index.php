<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GAINFIT</title>

</head>
<!-- CSS: tampilan dipisah per halaman di folder assets/css/ -->
<link rel="stylesheet" href="assets/css/umum.css">
<link rel="stylesheet" href="assets/css/beranda.css">
<link rel="stylesheet" href="assets/css/pencarian.css">
<link rel="stylesheet" href="assets/css/laporan.css">
<link rel="stylesheet" href="assets/css/profil.css">
<link rel="stylesheet" href="assets/css/menu.css">
<link rel="stylesheet" href="assets/css/popup.css">
<link rel="stylesheet" href="assets/css/login.css">
</head>

<body>
<div class="app">

    <!-- ===== HTML: isi halaman aplikasi (dipisah per file di folder views/) ===== -->
    <?php include "views/beranda.html"; ?>

    <?php include "views/pencarian.html"; ?>

    <?php include "views/laporan.html"; ?>

    <?php include "views/profil.html"; ?>

    <?php include "views/menu.html"; ?>
</div>

<?php include "views/popup-catat.html"; ?>

<?php include "views/login.html"; ?>

<?php include "views/popup-isi.html"; ?>

<!-- JAVASCRIPT: logika dipisah per halaman di folder assets/js/ -->
<!-- urutan penting: umum.js paling awal, main.js paling akhir -->
<script src="assets/js/umum.js"></script>
<script src="assets/js/login.js"></script>
<script src="assets/js/tampilkan.js"></script>
<script src="assets/js/menu.js"></script>
<script src="assets/js/beranda.js"></script>
<script src="assets/js/pencarian.js"></script>
<script src="assets/js/laporan.js"></script>
<script src="assets/js/profil.js"></script>
<script src="assets/js/popup-catat.js"></script>
<script src="assets/js/popup-isi.js"></script>
<script src="assets/js/main.js"></script>
</body>
</html>
