# 03. Mengapa Clean Architecture?

[⬅ Sebelumnya](./02-problems.md) | [Selanjutnya ➡](./04-core-concepts.md)

---

Mungkin Anda bertanya, "Kenapa harus repot-repot pakai Clean Architecture kalau aplikasi kecil saya sudah jalan?"

Jawabannya adalah: **Keberlanjutan (*Sustainability*)**.

### Keuntungan Utama

1. **Maintainability**: Kode lebih mudah dibaca dan diperbaiki. Anda tahu persis di mana harus mencari jika ada bug di bagian API atau bug di bagian logika bisnis.
2. **Parallel Development**: Dalam tim besar, satu orang bisa fokus mengerjakan UI, sementara orang lain mengerjakan integrasi API, tanpa saling menunggu.
3. **Refactoring Aman**: Anda bisa mengganti library database atau state management (misal dari Provider ke Bloc) tanpa harus mengubah logika bisnis di Domain layer.

### Kapan Harus Menggunakan?

- **Gunakan jika**: Aplikasi Anda akan berkembang besar, memiliki banyak fitur, atau dikerjakan oleh tim.
- **Jangan gunakan jika**: Anda hanya membuat aplikasi "Hello World" atau prototipe sederhana yang akan dibuang dalam 2 hari. Clean Architecture membutuhkan *boilerplate* (kode tambahan) yang cukup banyak di awal.

### Kapan Tidak Perlu?

Jika proyeknya sangat kecil dan deadline-nya besok pagi, menggunakan Clean Architecture mungkin akan memperlambat Anda karena banyaknya file yang harus dibuat. Namun, untuk proyek profesional jangka panjang, ini adalah investasi yang sangat berharga.

Sedikit typo di sini: arsitektur ini emang agak ribet di awal, tapi sangat membatu di akhir.

---
