# 07. Domain Layer

[⬅ Sebelumnya](./06-presentation-layer.md) | [Selanjutnya ➡](./08-data-layer.md)

---

Domain Layer adalah lapisan yang paling stabil. Kode di sini tidak boleh berubah hanya karena Anda mengganti library HTTP atau mengganti tema aplikasi.

### 1. Entities

Entity adalah objek data sederhana. Di Flutter, kita biasanya menggunakan package `equatable` agar bisa membandingkan dua objek dengan mudah.

```dart
class User extends Equatable {
  final String id;
  final String email;
  final String name;

  const User({required this.id, required this.email, required this.name});

  @override
  List<Object?> get props => [id, email, name];
}
```

### 2. Repositories (Interface)

Di sini kita hanya mendefinisikan "kontrak". Kita tidak peduli bagaimana data diambil, yang penting kita tahu fungsi apa yang tersedia.

```dart
abstract class AuthRepository {
  Future<Either<Failure, User>> login(String email, String password);
}
```

### 3. Use Cases

Use Case berisi logika bisnis spesifik untuk satu aksi. Satu file biasanya hanya berisi satu Use Case. Ini membuat kode sangat modular dan mudah di-test secara terisolasi.

```dart
// Base class untuk UseCase agar konsisten
abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}

class LoginUser implements UseCase<User, Params> {
  final AuthRepository repository;

  LoginUser(this.repository);

  @override
  Future<Either<Failure, User>> call(Params params) async {
    // Di sini Anda bisa menambahkan logika tambahan sebelum memanggil repo
    // Misal: validasi format email secara manual
    if (!params.email.contains('@')) {
      return Left(ValidationFailure('Email tidak valid'));
    }
    
    return await repository.login(params.email, params.password);
  }
}

// Class pembungkus parameter
class Params extends Equatable {
  final String email;
  final String password;

  const Params({required this.email, required this.password});

  @override
  List<Object?> get props => [email, password];
}
```

### Mengapa Use Case Penting?

Tanpa Use Case, Bloc Anda akan langsung memanggil Repository. Jika logika login menjadi rumit (misal: harus cek status premium dulu), Bloc Anda akan menjadi sangat kotor. Dengan Use Case, logika tersebut terbungkus rapi dan bisa digunakan kembali di tempat lain.

---
