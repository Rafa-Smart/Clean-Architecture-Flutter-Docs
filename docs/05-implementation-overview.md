# 05. Ikhtisar Implementasi

[⬅ Sebelumnya](./04-core-concepts.md) | [Selanjutnya ➡](./06-presentation-layer.md)

---

Bagaimana cara kita menerapkan konsep-konsep tadi ke dalam struktur folder Flutter? Berikut adalah struktur yang umum digunakan:

### Struktur Folder

```text
lib/
├── core/                # Utility, error handling, network info
├── features/            # Fitur-fitur aplikasi
│   └── auth/            # Contoh fitur Auth
│       ├── data/
│       │   ├── datasources/
│       │   ├── models/
│       │   └── repositories/
│       ├── domain/
│       │   ├── entities/
│       │   ├── repositories/
│       │   └── usecases/
│       └── presentation/
│           ├── bloc/
│           ├── pages/
│           └── widgets/
└── injection_container.dart # Dependency Injection
```

### Alur Data (Data Flow)

Mari kita lihat bagaimana data mengalir saat user menekan tombol login:

<div style="display: flex; justify-content: center; margin: 2rem 0; background: white; padding: 1rem; border-radius: 8px;">
  <img src="https://miro.medium.com/v2/resize:fit:1400/1*p_0-a_6-a_6-a_6-a_6.png" alt="Data Flow Diagram" referrerPolicy="no-referrer" style="max-width: 100%;" />
</div>

1. **UI (Presentation)**: User menekan tombol login.
2. **Bloc/Cubit (Presentation)**: Memanggil fungsi di **Use Case**.
3. **Use Case (Domain)**: Menjalankan logika bisnis dan memanggil **Repository**.
4. **Repository (Data)**: Memutuskan apakah mengambil data dari **Remote Data Source** (API) atau **Local Data Source** (Cache).
5. **Data Source (Data)**: Mengembalikan **Model**.
6. **Repository (Data)**: Mengubah **Model** menjadi **Entity** dan mengembalikannya ke **Use Case**.
7. **Use Case (Domain)**: Mengembalikan **Entity** ke **Bloc**.
8. **Bloc (Presentation)**: Mengubah state UI berdasarkan hasil yang diterima.

Alur ini mungkin terlihat panjang, tapi sangat teratur dan mudah dilacak jika terjadi error.

---
