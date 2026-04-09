# 06. Presentation Layer

[⬅ Sebelumnya](./05-implementation-overview.md) | [Selanjutnya ➡](./07-domain-layer.md)

---

Presentation Layer adalah tempat di mana UI Flutter berada. Tugas utamanya adalah menampilkan data ke user dan menerima input.

### Komponen Utama

1. **Pages**: Widget yang mewakili satu layar penuh. Biasanya berisi `Scaffold` dan mendengarkan state dari Bloc.
2. **Widgets**: Komponen UI yang lebih kecil dan bisa digunakan kembali. Pisahkan widget agar kode tidak menumpuk.
3. **State Management**: Jembatan antara UI dan logika bisnis (Domain). Kita akan menggunakan **Bloc** sebagai contoh karena sangat cocok dengan Clean Architecture.

### Contoh Kode Bloc

Berikut adalah contoh bagaimana Bloc memanggil Use Case. Perhatikan penggunaan `Either` dari package `dartz` untuk menangani error secara elegan.

```dart
class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final LoginUser loginUser; // Use Case

  AuthBloc({required this.loginUser}) : super(AuthInitial()) {
    on<LoginSubmitted>((event, emit) async {
      emit(AuthLoading());
      
      // Memanggil Use Case
      // Params adalah class pembungkus parameter agar fungsi call tetap konsisten
      final result = await loginUser(Params(
        email: event.email,
        password: event.password,
      ));

      // fold() adalah fungsi dari dartz untuk menangani Left (Failure) atau Right (Success)
      result.fold(
        (failure) => emit(AuthError(message: _mapFailureToMessage(failure))),
        (user) => emit(AuthSuccess(user: user)),
      );
    });
  }

  String _mapFailureToMessage(Failure failure) {
    switch (failure.runtimeType) {
      case ServerFailure:
        return 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
      case NetworkFailure:
        return 'Koneksi internet terputus. Periksa koneksi Anda.';
      default:
        return 'Terjadi kesalahan yang tidak terduga.';
    }
  }
}
```

### UI Implementation (LoginPage)

Di halaman UI, kita menggunakan `BlocConsumer` untuk mendengarkan perubahan state dan membangun UI secara reaktif.

```dart
BlocConsumer<AuthBloc, AuthState>(
  listener: (context, state) {
    if (state is AuthSuccess) {
      Navigator.pushReplacementNamed(context, '/home');
    } else if (state is AuthError) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(state.message)),
      );
    }
  },
  builder: (context, state) {
    if (state is AuthLoading) {
      return CircularProgressIndicator();
    }
    return LoginForm(); // Widget form login Anda
  },
)
```

### Best Practice

- **Jangan ada logika bisnis di Widget**: Widget hanya boleh berisi kode UI. Jika ada logika `if-else` yang rumit, pindahkan ke Bloc atau Use Case.
- **Gunakan Skeleton/Loading State**: Selalu berikan feedback visual saat data sedang diambil.
- **Pisahkan Widget**: Jika sebuah file Page sudah lebih dari 200 baris, mulailah memisahkan bagian-bagian UI ke file widget tersendiri.

Sedikit catatan: jangan lupa handle error di UI biar user gak bingung pas aplikasi crash.

---
