# 📋 DailyBoard

DailyBoard merupakan sebuah aplikasi web minimalis yang dirancang guna mempermudah pengelolaan agenda harian, pembuatan catatan praktis, pemantauan kutipan inspiratif, serta pengecekan prakiraan cuaca terkini. Proyek ini dibangun memakai HTML, CSS, dan JavaScript.

## ✨ Fitur

### 📝 Manajemen Tugas

DailyBoard menyediakan fasilitas fungsional untuk mengorganisasikan daftar pekerjaan harian secara efektif.

Fitur yang tersedia:

- Menambahkan agenda pekerjaan baru
- Menghapus item tugas
- Melakukan pembaruan atau pengeditan tugas
- Mengubah status tugas menjadi selesai
- Memfilter dan menampilkan tugas yang berstatus selesai
- Memfilter dan menampilkan tugas yang belum tuntas
- Menampilkan keseluruhan daftar tugas
- Fitur pencarian tugas via search bar
- Menyusun ulang urutan tugas menggunakan fungsi drag and drop
- Mekanisme penyimpanan data memanfaatkan localStorage
- Memastikan tugas tidak hilang saat peramban (browser) dimuat ulang

### 📒 Catatan

Disediakan khusus untuk merekam berbagai coretan atau memo ringkas.

Fitur:
- Membuat catatan baru
- Membuang catatan yang tidak terpakai
- Menyunting catatan secara cepat melalui aksi double click
- Menyertakan informasi waktu pembuatan catatan
- Mekanisme penyimpanan data memanfaatkan localStorage
- Menjaga keamanan data catatan kendati halaman disegarkan

### 💬 Quotes
DailyBoard mampu menyajikan rangkaian kutipan motivasi secara dinamis dari layanan penyedia API.

Fitur:

- Mengunduh kutipan secara daring (online)
- Memunculkan kutipan secara otomatis tepat saat halaman dibuka
- Menyediakan tombol interaktif untuk memperbarui kutipan
- Menghadirkan pesan penanganan eror manakala koneksi API mengalami kendala

### 🌤️ Cuaca
DailyBoard sanggup menyuguhkan informasi seputar kondisi atmosfer dan cuaca lewat integrasi OpenWeatherMap API.

Fitur:

- Menentukan lokasi kota secara mandiri
- Memaparkan tingkat temperatur suhu
- Menyajikan informasi deskripsi kondisi cuaca aktual
- Memuat parameter cuaca bawaan (default) saat pertama kali situs diakses
- Menarik informasi iklim secara langsung dari sumber API

### 🌙 Dark Mode

DailyBoard dilengkapi opsi pergantian tema agar nyaman dipandang pada kondisi minim cahaya.

Fitur:

- Mentransformasi antarmuka dari mode terang (Light Mode) ke mode gelap (Dark Mode)
- Menyimpan preferensi konfigurasi tema ke dalam localStorage
- Mempertahankan pilihan tema meskipun halaman direfresh

### 💾 Local Storage
Berbagai informasi krusial diamankan secara lokal melalui fasilitas penyimpanan peramban.

Data yang disimpan:

- Kumpulan daftar tugas
- Kumpulan arsip catatan
- Preferensi pengaturan tema situs

Dengan mekanisme ini, seluruh data pengguna tetap terjaga aman walau peramban ditutup atau dimuat ulang.
