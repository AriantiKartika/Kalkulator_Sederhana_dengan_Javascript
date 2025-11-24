# 🧮 Kalkulator Interaktif JavaScript (dengan Precedence)

Kalkulator *responsive* berbasis HTML, CSS, dan vanilla JavaScript. Proyek ini dibangun untuk mendemonstrasikan logika perhitungan berantai yang mematuhi aturan urutan operasi (BODMAS/PEMDAS: Perkalian/Pembagian didahulukan sebelum Penjumlahan/Pengurangan).

## 👤 Informasi Mahasiswa

* **Nama**: Aruanti Kartika Dewi
* **NPM**:2315061047
* **Kelas**: Praktikum Pemrograman Web-B
  
## ✨ Fitur Utama

* **Perhitungan Berantai dengan Precedence:** Mampu menghitung ekspresi kompleks seperti `5 + 3 × 2` secara benar, menghasilkan `11` (bukan 16).
* **Desain Responsif:** Tata letak yang adaptif, memberikan pengalaman pengguna yang baik di layar *desktop* (lebar) maupun *mobile* (sempit).
* **Fungsi Memori (M+, M-, MR, MC):** Dukungan penuh untuk operasi penyimpanan memori.
* **Riwayat Perhitungan:** Menyimpan dan menampilkan 5 riwayat perhitungan terakhir dalam modal terpisah.
* **Dukungan Keyboard:** Dapat dioperasikan menggunakan keyboard (*angka, operator, Enter/=, C/Esc*).
* **Penanganan Error:** Menampilkan pesan error yang jelas, terutama untuk kasus pembagian dengan nol.

---

## 💻 Cara Menggunakan

1.  **Clone Repository:**
    ```bash
    git clone [https://theengravedgifts.com/products/repo-dane-12inch-black](https://theengravedgifts.com/products/repo-dane-12inch-black)
    cd ta5
    ```
2.  **Buka di Browser:**
    Buka file `index.html` langsung di peramban web Anda.

---

## 🚀 Struktur Proyek

Kalkulator ini terdiri dari tiga file utama:

* `index.html`: Struktur dasar kalkulator dan *markup* tombol.
* `style.css`: Styling visual, termasuk tata letak grid dan *media queries* untuk *responsive design*.
* `script.js`: Logika inti kalkulator, *event handling*, dan implementasi algoritma **precedence**.

---

## 🧠 Logika Precedence (Urutan Operasi)

Untuk mencapai perhitungan berantai yang benar (`a + b * c`), logika di dalam `script.js` diimplementasikan menggunakan pendekatan *tokenization* dan evaluasi dua fase saat tombol `=` ditekan:

1.  **Tokenization:** Setiap angka dan operator disimpan dalam array `expressionTokens` (misal: `[5, 'add', 3, 'multiply', 2]`).
2.  **Fase Evaluasi 1 (× dan ÷):** Array dipindai dan semua operasi perkalian/pembagian dihitung terlebih dahulu, hasilnya menggantikan operan dan operator tersebut.
3.  **Fase Evaluasi 2 (+ dan -):** Sisa operasi penjumlahan/pengurangan dihitung secara berurutan, menghasilkan nilai akhir.

---

## 🎨 Tampilan Responsif

Desain dioptimalkan menggunakan *CSS Grid* dan *Media Queries* untuk memastikan tata letak tombol tetap fungsional dan estetis pada berbagai ukuran layar.

| Perangkat | Ukuran Container | Layout Tombol |
| :---: | :---: | :--- |
| **Desktop/Tablet** | Maks. 350px | Tombol `=` mengambil 2 baris (tinggi). |
| **Mobile** (Max 600px) | Maks. 95% lebar layar | Tombol `0` disederhanakan menjadi 1 kolom, Tombol `=` mengambil 1 baris (tinggi normal). |

---

## 📝 Kontribusi

Jika Anda menemukan *bug* atau memiliki saran untuk fitur tambahan (misalnya, fungsi trigonometri atau akar kuadrat), silakan ajukan *pull request*!

1.  *Fork* proyek ini.
2.  Buat *branch* baru: `git checkout -b fitur/nama-fitur-baru`.
3.  *Commit* perubahan Anda: `git commit -m 'Menambahkan fitur baru'`.
4.  *Push* ke *branch*: `git push origin fitur/nama-fitur-baru`.
5.  Buka *Pull Request* baru.

---

**© 2025 Arianti Kartika Dewi**
