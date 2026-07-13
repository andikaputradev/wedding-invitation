# Undangan Digital Premium — Arga & Nimas

Website undangan pernikahan digital premium menggunakan Next.js 15, Framer Motion, dan Google Apps Script sebagai backend.

---

## Stack Teknologi

- **Frontend**: Next.js 15 App Router, React 19, TypeScript, Tailwind CSS
- **Animasi**: Framer Motion
- **Dark Mode**: next-themes
- **Backend**: Google Apps Script
- **Database**: Google Spreadsheet
- **Hosting**: Vercel

---

## Setup Lokal

### 1. Clone dan Install Dependency

```bash
git clone https://github.com/andikaputradev/wedding-invitation
cd wedding-invitation
npm install
```

### 2. Konfigurasi Environment Variable

```bash
cp .env.example .env.local
```

Isi `.env.local`:

```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

---

## Setup Google Spreadsheet & Apps Script

### Langkah 1 — Buat Google Spreadsheet

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru, beri nama: **Wedding Invitation DB**
3. Catat **Spreadsheet ID** dari URL:
   `https://docs.google.com/spreadsheets/d/**SPREADSHEET_ID**/edit`

> Sheet RSVP dan Guestbook akan dibuat otomatis oleh Apps Script saat pertama kali data dikirim.

### Langkah 2 — Buat Google Apps Script

1. Buka [script.google.com](https://script.google.com)
2. Klik **New Project**
3. Hapus kode default
4. Copy seluruh isi file `apps-script/Code.gs` dan paste ke editor
5. Simpan project (Ctrl+S), beri nama: **Wedding Invitation API**

### Langkah 3 — Konfigurasi Script Properties

1. Di Apps Script, klik ikon ⚙️ **Project Settings** (kiri bawah)
2. Scroll ke bagian **Script Properties**
3. Klik **Add script property**
4. Isi:
   - Property: `SPREADSHEET_ID`
   - Value: ID spreadsheet dari Langkah 1
5. Klik **Save script properties**

### Langkah 4 — Deploy sebagai Web App

1. Di Apps Script, klik **Deploy** → **New deployment**
2. Klik ikon ⚙️ di sebelah **Select type**, pilih **Web app**
3. Konfigurasi:
   - **Description**: `Wedding Invitation API v1`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Klik **Deploy**
5. **Authorize** akses jika diminta (pilih akun Google Anda)
6. Salin **Web App URL** yang diberikan

> Format URL: `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`

### Langkah 5 — Isi Environment Variable

Tempel Web App URL ke `.env.local`:

```
NEXT_PUBLIC_APPS_SCRIPT_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

---

## Uji Coba Lokal

### Test RSVP (curl)

```bash
curl -X POST "https://script.google.com/macros/s/DEPLOYMENT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{"action":"rsvp","name":"Budi Santoso","attendance":"attending","guestCount":2,"message":"Selamat ya!","userAgent":"test"}'
```

### Test Guestbook Submit

```bash
curl -X POST "https://script.google.com/macros/s/DEPLOYMENT_ID/exec" \
  -H "Content-Type: application/json" \
  -d '{"action":"guestbook","name":"Sari Dewi","message":"Semoga langgeng dan bahagia!","userAgent":"test"}'
```

### Test Get Guestbook

```bash
curl "https://script.google.com/macros/s/DEPLOYMENT_ID/exec?action=get_guestbook"
```

---

## Deploy ke Vercel

### Langkah 1 — Build Check Lokal

```bash
npm run build
```

Pastikan tidak ada error.

### Langkah 2 — Push ke GitHub

```bash
git add .
git commit -m "feat: wedding invitation production build"
git push origin main
```

### Langkah 3 — Import ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. Klik **Add New Project**
3. Import repository GitHub Anda
4. Framework preset: **Next.js** (otomatis terdeteksi)

### Langkah 4 — Set Environment Variables di Vercel

Di halaman project Vercel → **Settings** → **Environment Variables**:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_APPS_SCRIPT_URL` | `https://script.google.com/macros/s/ID/exec` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production |

### Langkah 5 — Deploy

Klik **Deploy**. Vercel akan build dan deploy otomatis.

---

## Personalisasi

### Mengganti Data Undangan

Edit file `data/invitation.ts` untuk mengubah:
- Nama pasangan
- Tanggal dan tempat acara
- Data rekening hadiah
- Timeline cerita
- Foto galeri

### Mengganti Foto Galeri

Ganti URL di `data/invitation.ts` pada field `gallery` dengan URL foto asli.
Untuk foto lokal, tempatkan di `public/images/` dan gunakan path `/images/nama-foto.jpg`.

### Menambah Musik Latar

Tempatkan file audio di `public/audio/wedding-music.mp3`.

### Mengatur Guest Name via URL

Undangan personal dapat dikirim dengan parameter URL:

```
https://your-domain.vercel.app?to=Nama%20Tamu
```

---

## Struktur Apps Script Deployment

Setiap perubahan pada `Code.gs` memerlukan **New Deployment** baru:

1. Klik **Deploy** → **Manage deployments**
2. Klik ikon ✏️ pada deployment aktif
3. Ubah version ke **New version**
4. Klik **Deploy**
5. URL tidak berubah jika menggunakan deployment yang sama

---

## Debug Error Umum

### RSVP/Guestbook Tidak Tersimpan

- Periksa `NEXT_PUBLIC_APPS_SCRIPT_URL` sudah benar
- Pastikan Apps Script di-deploy dengan akses **Anyone**
- Buka Apps Script → **Executions** untuk melihat log error
- Verifikasi `SPREADSHEET_ID` di Script Properties sudah benar

### Hydration Mismatch

- Sudah diatasi dengan `suppressHydrationWarning` di root HTML
- ThemeToggle render hanya setelah `mounted = true`

### Build Error TypeScript

```bash
npm run type-check
```

### CORS Issue

Google Apps Script tidak mendukung CORS preflight. Solusi:
- Pastikan POST request menggunakan `Content-Type: application/json`
- Apps Script mengembalikan header CORS secara otomatis untuk GET/POST

### Foto Tidak Muncul

- Tambahkan domain foto ke `remotePatterns` di `next.config.ts`
- Pastikan URL foto dapat diakses publik

---

## Perintah Berguna

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check tanpa build
```
