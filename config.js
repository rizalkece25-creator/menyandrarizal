/* Edit data undangan di sini */
const CFG = {
  title: 'The Wedding of Rizal & Sandra',
  groom: { nama: 'Rizal', lengkap: 'Rizal Nur Rofiq', ortu: 'Putra dari Bpk. Slamet Waluyo & Ibu Sulati', ig: 'https://www.instagram.com/kangguplo/', foto: 'https://lh3.googleusercontent.com/d/1UxsbzbHNroQRletyfM5QuB_08mQeg3fe' },
  bride: { nama: 'Sandra', lengkap: 'Sandra Isti Syafira', ortu: 'Putri dari Alm. Bpk. Edi & Ibu Nunung', ig: 'https://www.instagram.com/sandrasyaf/', foto: 'https://lh3.googleusercontent.com/d/1i89ynEA9N7pnSmF9oYBCg0oC89QGwb6z' },
  tanggalTeks: 'Minggu, 26 September 2027',
  mulai: '2027-09-26T08:00:00+07:00',   // untuk countdown & kalender
  selesai: '2027-09-26T14:00:00+07:00',
  tema: '#838a6f',
  musik: 'https://www.image2url.com/r2/default/audio/1794313068432-4ed6e0d7-9579-4acc-9b5f-ca4d38be2ced.mp3',            // URL file .mp3 langsung (mis. link Google Drive/hosting). Kosongkan = tanpa musik
  fotoCover: 'https://lh3.googleusercontent.com/d/1QRz6sXYysIfhyOcdlRvzDHeI8AtLNF86',        // URL gambar (portrait). Kosongkan = warna tema
  ayat: [
    { sumber: 'QS. Ar-Rum Ayat 21', teks: 'Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.' }
  ],
  acara: [
    { nama: 'Akad Nikah', hari: 'Minggu, 26 September 2027', jam: '08.00 - 10.00 WIB', lokasi: 'Erhanesia Convention Center', alamat: 'Jl. Pasukan Pelajar No.18, RT.1/RW.2, Purbalingga Wetan, Kec. Purbalingga, Kabupaten Purbalingga', maps: 'https://share.google/LP9W0lQ617Vr6Ebl5' },
    { nama: 'Resepsi', hari: 'Minggu, 26 September 2027', jam: '11.00 - 14.00 WIB', lokasi: 'Erhanesia Convention Center', alamat: 'Jl. Pasukan Pelajar No.18, RT.1/RW.2, Purbalingga Wetan, Kec. Purbalingga, Kabupaten Purbalingga', maps: 'https://share.google/LP9W0lQ617Vr6Ebl5' }
  ],
  livestream: { aktif: false, link: '' },
  filterIG:   { aktif: false, link: '' },
  galeri: ['https://lh3.googleusercontent.com/d/1DU0EXW68LG9A_VscpuSo9sXCowDw1Zwu','https://lh3.googleusercontent.com/d/1TntFP8AXfQbMiiehF6m166dFvVZZKHvq','https://lh3.googleusercontent.com/d/1rYES_HeVm8Fpld4S29iZslgjrZbGxV4t','https://lh3.googleusercontent.com/d/1HeOgBY61rFHGtBbA_8esSJ94D1p5e1Qq','https://lh3.googleusercontent.com/d/14urTW6sFDrvLa8SSE-ze35yb3qJmM8cZ'],           // isi array URL gambar, contoh: ['https://...jpg','https://...jpg']
  bank: [
    { bank: 'Seabank', norek: '901202806243', atasNama: 'Rizal Nur Rofiq' },
    { bank: 'Seabank', norek: '901158361917', atasNama: 'Sandra Isti Syafira' }
  ],
  alamatKado: { penerima: 'Sandra Isti Syafira', alamat: 'Jl. Raya Mayjen Sungkono No.KM 5, Dusun 1, Blater, Kec. Kalimanah, Kabupaten Purbalingga, Jawa Tengah', hp: '085173142698' },
  whatsapp: '628222222',   // format 62xxxx, tanpa + atau 0
  apiUrl: 'https://script.google.com/macros/s/AKfycbyJ-Qs36MyxJptRDVBe5XyQstdLmSUZvneCNpepe5dsvSEI35WmgdXOSoKYroa9BkVWew/exec'   // URL hasil Deploy Apps Script (lihat README)
};
