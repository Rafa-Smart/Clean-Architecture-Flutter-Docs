# 04. Konsep Inti

[⬅ Sebelumnya](./03-why-clean-architecture.md) | [Selanjutnya ➡](./05-implementation-overview.md)

---

Clean Architecture membagi aplikasi menjadi 3 lapisan utama. Mari kita bahas satu per satu dari yang paling dalam.

<div style="display: flex; justify-content: center; margin: 2rem 0;">
  <img src="https://raw.githubusercontent.com/ResoCoder/flutter-clean-architecture-tdd-course-info/master/clean-architecture-diagram.png" alt="Flutter Clean Architecture Layers" referrerPolicy="no-referrer" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 100%;" />
</div>

### 1. Domain Layer (Pusat)
Ini adalah jantung dari aplikasi Anda. Lapisan ini berisi:
- **Entities**: Objek bisnis dasar (misal: `User`, `Product`).
- **Use Cases**: Logika bisnis spesifik (misal: `LoginUser`, `GetProductList`).
- **Repositories (Interface)**: Definisi apa yang bisa dilakukan oleh data layer, tanpa tahu bagaimana caranya.

### 2. Data Layer (Luar)
Lapisan ini bertanggung jawab untuk mengambil dan menyimpan data. Berisi:
- **Repositories (Implementation)**: Implementasi nyata dari interface di Domain.
- **Data Sources**: Tempat mengambil data (Remote API, Local DB).
- **Models**: Representasi data dari API (JSON) yang biasanya punya fungsi `fromJson` dan `toJson`.

### 3. Presentation Layer (Terluar)
Lapisan ini adalah apa yang dilihat user. Berisi:
- **Widgets/Pages**: UI Flutter.
- **State Management**: Bloc, Provider, atau Cubit yang mengatur alur data ke UI.

### Dependency Rule (Aturan Ketergantungan)

Ini adalah aturan paling krusial: **Domain Layer tidak boleh tergantung pada layer lain.**

- **Presentation** tergantung pada **Domain**.
- **Data** tergantung pada **Domain**.
- **Domain** tidak tahu apa-apa tentang Data atau Presentation.

Dengan aturan ini, jika Anda mengganti database di Data layer, Domain layer tidak akan terpengaruh sama sekali.

---
