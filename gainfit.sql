-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Nov 2026 pada 14.20
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gainfit`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aktivitas`
--

CREATE TABLE `aktivitas` (
  `id` int(11) NOT NULL,
  `pengguna_id` int(11) NOT NULL,
  `jenis` varchar(50) NOT NULL,
  `menit` int(11) NOT NULL DEFAULT 0,
  `catatan` varchar(255) NOT NULL DEFAULT '',
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `aktivitas`
--

INSERT INTO `aktivitas` (`id`, `pengguna_id`, `jenis`, `menit`, `catatan`, `tanggal`) VALUES
(1, 1, 'GYM', 45, 'biceps 5kg 3x8', '2026-11-21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `berat`
--

CREATE TABLE `berat` (
  `id` int(11) NOT NULL,
  `pengguna_id` int(11) NOT NULL,
  `kg` decimal(5,1) NOT NULL,
  `tanggal` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `berat`
--

INSERT INTO `berat` (`id`, `pengguna_id`, `kg`, `tanggal`) VALUES
(1, 1, 45.0, '2026-11-21'),
(2, 1, 49.0, '2026-11-21'),
(3, 1, 50.0, '2026-11-21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengguna`
--

CREATE TABLE `pengguna` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pertanyaan` varchar(150) NOT NULL,
  `jawaban` varchar(255) NOT NULL,
  `nama` varchar(100) NOT NULL DEFAULT '',
  `target` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengguna`
--

INSERT INTO `pengguna` (`id`, `email`, `username`, `password`, `pertanyaan`, `jawaban`, `nama`, `target`) VALUES
(1, 'rama@gmail.com', 'rama', '$2y$12$.xYMgQfS9KHb93RBsECnW.yeaScyqFs1nLzrPOdsqTgLSh0mGuf0.', 'Siapa nama hewan peliharaan pertamamu?', '$2y$12$WCplE/XoKSJno3cnFeWH4.rYqOzOZAid/KVRzmpUUdoNR164lBPAa', 'rama', 0),
(2, 'stellar@gmail.com', 'RanggaJosjis', '$2y$12$.T311otIO9g2pe6Dmbqwc.QYP419vaT9hP.plvhdY5r.4PMneI9Me', 'Apa makanan favoritmu?', '$2y$12$KFJPcyE271yIcxue2JHO3eAyq0KkzNYNyiw1eWipxKBAdR.lD6mPe', 'RanggaJosjis', 0),
(3, 'gh@gmail.com', 'gh', '$2y$12$eCbSliYFMDKN170ZwSiuOeL3.bGp.Jza3.oukE6T7VGKz14hgtJey', 'Siapa nama hewan peliharaan mu?', '$2y$12$TOpCdJC066FJJqkaGSgcH.Wg8dr7lFSta42dbCnWDlVwKB7IFOI6a', 'gh', 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengguna_id` (`pengguna_id`);

--
-- Indeks untuk tabel `berat`
--
ALTER TABLE `berat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengguna_id` (`pengguna_id`);

--
-- Indeks untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `berat`
--
ALTER TABLE `berat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `aktivitas`
--
ALTER TABLE `aktivitas`
  ADD CONSTRAINT `aktivitas_ibfk_1` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `berat`
--
ALTER TABLE `berat`
  ADD CONSTRAINT `berat_ibfk_1` FOREIGN KEY (`pengguna_id`) REFERENCES `pengguna` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
