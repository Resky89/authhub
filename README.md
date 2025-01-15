# AuthHub API

Selamat datang di repositori AuthHub API! Proyek ini bertujuan untuk menyediakan API RESTful untuk autentikasi dan manajemen pengguna menggunakan JWT. API ini dibangun sepenuhnya menggunakan JavaScript.

Welcome to the AuthHub API repository! This project aims to provide a RESTful API for authentication and user management using JWT. This API is built entirely using JavaScript.

## 📚 Daftar Isi / Table of Contents

- [Pengenalan / Introduction](#pengenalan--introduction)
- [Fitur / Features](#fitur--features)
- [Teknologi / Technologies](#teknologi--technologies)
- [Instalasi / Installation](#instalasi--installation)
- [Penggunaan / Usage](#penggunaan--usage)
- [API Endpoints](#api-endpoints)

## 📖 Pengenalan / Introduction

AuthHub API adalah API yang dirancang untuk menyediakan autentikasi dan manajemen pengguna menggunakan JWT. API ini memungkinkan aplikasi untuk mengelola proses login, pendaftaran, dan pengelolaan pengguna dengan aman.

AuthHub API is designed to provide authentication and user management using JWT. This API enables applications to manage the login, registration, and user management process securely.

## ✨ Fitur / Features

- Autentikasi menggunakan JWT
- Pendaftaran Pengguna
- Login Pengguna
- Manajemen Pengguna

- Authentication using JWT
- User Registration
- User Login
- User Management

## 🛠️ Teknologi / Technologies

- **JavaScript**: 100%

## 🚀 Instalasi / Installation

Untuk memulai dengan AuthHub API, ikuti langkah-langkah berikut:

To get started with AuthHub API, follow these steps:

1. Clone repositori:
    ```sh
    git clone https://github.com/Resky89/authhub-api.git
    cd authhub-api
    ```

2. Instal dependensi:
    ```sh
    npm install
    ```

3. Atur variabel lingkungan. Buat file `.env` di direktori root dan tambahkan variabel yang diperlukan:
    ```env
    PORT=<your_port>
    JWT_SECRET=<your_jwt_secret>
    DB_CONNECTION_STRING=<your_database_connection_string>
    ```

1. Clone the repository:
    ```sh
    git clone https://github.com/Resky89/authhub-api.git
    cd authhub-api
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the necessary variables:
    ```env
    PORT=<your_port>
    JWT_SECRET=<your_jwt_secret>
    DB_CONNECTION_STRING=<your_database_connection_string>
    ```

## 📖 Penggunaan / Usage

Setelah menginstal dependensi dan mengatur variabel lingkungan, Anda dapat menjalankan server menggunakan perintah berikut:

```sh
npm start
```

Once the dependencies are installed and environment variables are set up, you can start the server using the following command:

```sh
npm start
```

Server akan berjalan di `http://localhost:<your_port>`.

The server will run at `http://localhost:<your_port>`.

## API Endpoints

Berikut adalah beberapa endpoint utama yang tersedia di API ini:

Here are some of the main endpoints available in this API:

- **Autentikasi / Authentication**
  - POST `/api/register`: Mendaftarkan pengguna baru / Register a new user
  - POST `/api/login`: Login pengguna / User login

- **Pengguna / Users**
  - GET `/api/users`: Mendapatkan semua pengguna (butuh autentikasi) / Get all users (requires authentication)
  - GET `/api/users/:id`: Mendapatkan pengguna berdasarkan ID (butuh autentikasi) / Get user by ID (requires authentication)
  - PUT `/api/users/:id`: Memperbarui pengguna berdasarkan ID (butuh autentikasi) / Update user by ID (requires authentication)
  - DELETE `/api/users/:id`: Menghapus pengguna berdasarkan ID (butuh autentikasi) / Delete user by ID (requires authentication)
