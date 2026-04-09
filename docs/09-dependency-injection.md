# 09. Dependency Injection

[⬅ Sebelumnya](./08-data-layer.md) | [Selanjutnya ➡](./10-example-project.md)

---

Dependency Injection (DI) adalah teknik di mana sebuah objek menerima objek lain yang ia butuhkan. Dalam Clean Architecture, DI sangat penting untuk menjaga agar antar komponen tetap *decoupled*.

Di Flutter, kita biasanya menggunakan package **get_it**.

### Mengapa Pakai DI?

Tanpa DI, Anda akan membuat objek secara manual seperti ini:
`final repo = AuthRepositoryImpl(remoteDataSource: AuthRemoteDataSourceImpl(client: http.Client()))`.
Bayangkan jika Anda harus melakukan ini di setiap Page. Sangat melelahkan dan sulit di-maintain.

### Contoh Implementasi dengan GetIt

Kita biasanya membuat satu file bernama `injection_container.dart`:

```dart
final sl = GetIt.instance; // sl singkatan dari Service Locator

Future<void> init() async {
  // Features - Auth
  // Bloc
  sl.registerFactory(() => AuthBloc(loginUser: sl()));

  // Use cases
  sl.registerLazySingleton(() => LoginUser(sl()));

  // Repository
  sl.registerLazySingleton<AuthRepository>(
    () => AuthRepositoryImpl(remoteDataSource: sl(), networkInfo: sl()),
  );

  // Data sources
  sl.registerLazySingleton<AuthRemoteDataSource>(
    () => AuthRemoteDataSourceImpl(client: sl()),
  );

  // External
  sl.registerLazySingleton(() => http.Client());
}
```

### Cara Pakai di Main

```dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init(); // Inisialisasi DI
  runApp(MyApp());
}
```

Dengan DI, Anda cukup memanggil `sl<AuthBloc>()` dan GetIt akan otomatis menyusun semua ketergantungan yang dibutuhkan di belakang layar.

Satu typo lagi: DI ini bener-bener ngebantu buat urusan testing nantinya.

---
