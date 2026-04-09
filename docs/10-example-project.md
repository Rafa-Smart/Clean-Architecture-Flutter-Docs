# 10. Contoh Proyek

[⬅ Sebelumnya](./09-dependency-injection.md)

---

Setelah mempelajari semua teori di atas, saatnya melihat bagaimana semuanya bekerja bersama dalam sebuah fitur Login yang nyata.

### Skenario
User memasukkan email dan password, lalu menekan tombol login. Aplikasi akan memanggil API, menyimpan data user, dan berpindah ke halaman Home.

### Langkah-langkah Implementasi

1. **Definisikan Entity**: Buat class `User`.
2. **Definisikan Repository Interface**: Buat `AuthRepository`.
3. **Buat Use Case**: Buat `LoginUser`.
4. **Buat Model**: Buat `UserModel` yang meng-extend `User`.
5. **Buat Data Source**: Implementasikan pemanggilan API dengan `http` atau `dio`.
6. **Implementasikan Repository**: Buat `AuthRepositoryImpl`.
7. **Buat Bloc**: Tangani event login dan panggil Use Case.
8. **Daftarkan di DI**: Masukkan semua class ke `injection_container.dart`.
9. **Buat UI**: Buat `LoginPage` yang menggunakan `BlocBuilder` atau `BlocListener`.

### Tips Tambahan

- **Gunakan dartz**: Package ini sangat populer untuk menangani error dengan gaya fungsional (`Either<Failure, Success>`).
- **Unit Testing**: Mulailah menulis test untuk Domain layer terlebih dahulu. Karena Domain tidak punya ketergantungan, testing-nya sangat mudah.
- **Folder Core**: Jangan lupa letakkan class-class yang dipakai di banyak fitur (seperti `Failure`, `NetworkInfo`, atau `UseCase` base class) di dalam folder `core`.

### Kesimpulan

Clean Architecture memang terasa berat di awal. Anda akan membuat banyak file hanya untuk satu fitur sederhana. Tapi percayalah, saat aplikasi Anda sudah punya 20+ fitur dan tim Anda bertambah jadi 5 orang, Anda akan sangat bersyukur telah menggunakan arsitektur ini.

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*z3R_XW_XW_XW_XW_XW_XW.png" alt="Clean Architecture Success" referrerPolicy="no-referrer" style="border-radius: 8px; max-width: 100%;" />
</div>

Selamat ngoding dan semoga aplikasi Flutter Anda makin mantap!

---
