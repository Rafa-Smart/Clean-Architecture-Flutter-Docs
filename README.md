# 01. Pendahuluan

## apa ini ?

ini adalah docs saya belajar clean architecture di flutter
masih sangat basic dan anda juga bisa ikut berkontribusi

## link docs

ini adlah link website docs yang lebih baik
silahkan di lihat dan di kunjungi


[Selanjutnya ➡](./02-problems.md)

---

Clean Architecture adalah sebuah pola arsitektur perangkat lunak yang diperkenalkan oleh Robert C. Martin (Uncle Bob). Tujuan utamanya adalah untuk memisahkan kekhawatiran (_separation of concerns_) antara logika bisnis inti dengan detail teknis seperti UI, database, dan framework.

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="Clean Architecture Diagram" referrerPolicy="no-referrer" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 100%;" />
</div>

Dalam konteks Flutter, Clean Architecture membantu kita menghindari "Spaghetti Code" di mana logika aplikasi tercampur aduk di dalam widget. Dengan arsitektur ini, aplikasi kita akan menjadi:

1. **Independent of Framework**: Logika bisnis tidak tergantung pada Flutter itu sendiri.
2. **Testable**: Logika bisnis bisa diuji tanpa UI, database, atau web server.
3. **Independent of UI**: UI bisa diganti dengan mudah tanpa mengubah logika bisnis.
4. **Independent of Database**: Anda bisa mengganti SQLite dengan Hive atau Firebase tanpa menyentuh logika inti.

### Gambaran Besar

Bayangkan sebuah bawang. Lapisan terdalam adalah yang paling penting (logika bisnis), dan lapisan terluar adalah detail teknis (UI, API). Aturan utamanya adalah: **Ketergantungan hanya boleh mengarah ke dalam.**

Lapisan luar boleh tahu tentang lapisan dalam, tapi lapisan dalam tidak boleh tahu apa-apa tentang lapisan luar.

---
