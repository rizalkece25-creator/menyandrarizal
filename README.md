# Undangan Pernikahan - Vercel

Frontend statis di Vercel, penyimpanan ucapan/RSVP tetap di Google Sheets lewat Google Apps Script.

## 1. Pasang backend (Apps Script)
1. Buka https://script.google.com > New project, tempel isi `apps-script/Code.gs`.
2. Pastikan `SPREADSHEET_ID` sudah benar.
3. Deploy > New deployment > tipe **Web app** > Execute as: **Me** > Who has access: **Anyone** > Deploy, izinkan akses.
4. Salin **Web app URL** (berakhiran `/exec`).
5. Setiap mengubah Code.gs, buat deployment versi baru (Manage deployments > Edit > New version).

## 2. Isi config
Buka `config.js`, ganti nilai `apiUrl` dengan URL Web app tadi. Data lain (nama, acara, foto, dll) juga diedit di file ini.

## 3. Deploy ke Vercel
- Lewat GitHub: upload folder ini ke repo, lalu Vercel > Add New Project > Import. Framework: **Other**, tanpa build command.
- Atau CLI: `npm i -g vercel` lalu jalankan `vercel --prod` di folder ini.

## Link tamu
`https://domain-kamu.vercel.app/?to=Nama+Tamu`
