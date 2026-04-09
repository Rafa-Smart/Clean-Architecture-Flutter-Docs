# 02. Masalah Tanpa Arsitektur

[⬅ Sebelumnya](./01-introduction.md) | [Selanjutnya ➡](./03-why-clean-architecture.md)

---

Banyak developer pemula (dan bahkan senior) sering terjebak dalam pola "MVC" yang salah kaprah di Flutter, atau bahkan tidak menggunakan arsitektur sama sekali. Semua kode diletakkan di dalam satu file widget yang sangat panjang.

### Masalah yang Sering Muncul

1. **Fat Widgets**: Widget yang berisi ratusan baris kode, mencampur logika UI, validasi form, hingga pemanggilan API.
2. **Sulit Diuji**: Karena logika bisnis menempel pada widget, kita harus menjalankan *widget test* yang lambat hanya untuk menguji logika sederhana.
3. **Efek Samping Tak Terduga**: Mengubah satu fitur kecil bisa merusak fitur lain karena kodenya saling terkait erat (*tightly coupled*).
4. **Duplikasi Kode**: Logika yang sama ditulis berulang kali di halaman yang berbeda.

### Contoh Kasus Nyata

Bayangkan Anda membuat fitur Login. Tanpa arsitektur, Anda mungkin melakukan ini di dalam `onPressed` tombol:

```dart
// CONTOH BURUK
onPressed: () async {
  if (emailController.text.isEmpty) return;
  
  final response = await http.post(
    Uri.parse('https://api.example.com/login'),
    body: {'email': emailController.text},
  );
  
  if (response.statusCode == 200) {
    // Simpan ke local storage
    final prefs = await SharedPreferences.getInstance();
    prefs.setString('token', json.decode(response.body)['token']);
    // Navigasi
    Navigator.push(context, MaterialPageRoute(builder: (_) => HomePage()));
  }
}
```

Kodenya terlihat jalan, tapi ini adalah bom waktu. Jika besok API berubah, atau Anda ingin mengganti `http` dengan `dio`, Anda harus mencari semua `onPressed` di seluruh aplikasi. Melelahkan, bukan?

---
