# Konovo Test App

Konovo Test App is a simple full-stack application using **Laravel 12** (backend API) and **React 19** (frontend via Vite). This guide explains how to set up and run the project locally.

> ✅ **No database setup is required.**

---

## 🧰 Tech Stack

- **Backend:** Laravel 12 (PHP 8.2+)
- **Frontend:** React 19
- **Bundler:** Vite
- **Package Manager:** Composer + npm/yarn
- **Dev Server:** Artisan + Vite

---

## ✅ Requirements

Make sure these are installed:

- PHP >= 8.2
- Composer
- Node.js >= 18
- npm or yarn
- Git (optional but recommended)

---

## ⚙️ Full Setup Instructions

### 1. Clone the Repository

### 2. Setup the Project

```bash
git clone https://github.com/petarstesic2002/Konovo-Test.git
cd Konovo-Test
composer install
cp .env.example .env
php artisan key:generate

npm install
# or
yarn install
```
### 3. Build and Run

```bash
npm run build
# or
yarn build

php artisan serve
```