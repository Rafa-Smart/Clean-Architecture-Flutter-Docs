# 08. Data Layer

[⬅ Sebelumnya](./07-domain-layer.md) | [Selanjutnya ➡](./09-dependency-injection.md)

---

Data Layer adalah tempat di mana implementasi nyata terjadi. Di sini kita berurusan dengan JSON, database, dan library pihak ketiga.

### 1. Models

Model adalah "anak" dari Entity yang punya kemampuan tambahan untuk konversi data (misal dari JSON). Model berada di Data Layer karena ia tahu tentang detail teknis (JSON).

```dart
class UserModel extends User {
  const UserModel({
    required String id,
    required String email,
    required String name,
  }) : super(id: id, email: email, name: name);

  // Mengubah JSON dari API menjadi Model
  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id'],
      email: json['email'],
      name: json['name'],
    );
  }

  // Mengubah Model menjadi JSON untuk dikirim ke API
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
    };
  }
}
```

### 2. Data Sources

Ada dua jenis Data Source:
- **Remote**: Mengambil data dari internet (API).
- **Local**: Mengambil data dari penyimpanan lokal (SQLite, Hive, SharedPreferences).

```dart
abstract class AuthRemoteDataSource {
  Future<UserModel> login(String email, String password);
}

class AuthRemoteDataSourceImpl implements AuthRemoteDataSource {
  final http.Client client;
  AuthRemoteDataSourceImpl({required this.client});

  @override
  Future<UserModel> login(String email, String password) async {
    final response = await client.post(...);
    if (response.statusCode == 200) {
      return UserModel.fromJson(json.decode(response.body));
    } else {
      throw ServerException();
    }
  }
}
```

### 3. Repository Implementation

Di sinilah kita menghubungkan semuanya. Repository Impl akan memanggil Data Source dan menangani error.

```dart
class AuthRepositoryImpl implements AuthRepository {
  final AuthRemoteDataSource remoteDataSource;
  final NetworkInfo networkInfo;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, User>> login(String email, String password) async {
    if (await networkInfo.isConnected) {
      try {
        final remoteUser = await remoteDataSource.login(email, password);
        return Right(remoteUser);
      } on ServerException {
        return Left(ServerFailure());
      }
    } else {
      return Left(NetworkFailure());
    }
  }
}
```

---
