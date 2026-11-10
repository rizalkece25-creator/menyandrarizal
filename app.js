(function () {
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; };
  var nameBoth = CFG.groom.nama + ' & ' + CFG.bride.nama;
  document.documentElement.style.setProperty('--c', CFG.tema || '#838a6f');
  document.title = CFG.title;

  /* ---------- isi konten dari CONFIG ---------- */
  ['#coverNames', '#heroNames', '#closeNames'].forEach(function (s) { $(s).textContent = nameBoth; });
  $('#heroDate').textContent = CFG.tanggalTeks;
  $('#penutup').textContent = CFG.penutup;
  if (GUEST) { $('.guest').textContent = GUEST; $('#wNama').value = GUEST; }
  else $('.guest').textContent = 'Tamu Undangan';
  if (CFG.fotoCover) $('#cover').style.backgroundImage = 'url("' + CFG.fotoCover + '")';
  if (CFG.fotoJourney) { $('#journeyImg').src = CFG.fotoJourney; $('#journeyImg').hidden = false; }

  $('#ayat').innerHTML = CFG.ayat.map(function (a) {
    return '<p class="quote"><b>' + esc(a.sumber) + '</b>"' + esc(a.teks) + '"</p>';
  }).join('');

  function igUrl(v) {
    v = String(v || '').trim();
    if (/^https?:\/\//i.test(v)) return v;
    return 'https://www.instagram.com/' + v.replace(/^@/, '').replace(/[^\w.]/g, '') + '/';
  }
  function person(p) {
    var ig = p.ig ? '<a class="btn ghost ig" target="_blank" rel="noopener" href="' + esc(igUrl(p.ig)) + '">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> ' +
      esc(String(p.ig).indexOf('http') === 0 ? 'Instagram' : p.ig) + '</a>' : '';
    var img = p.foto ? '<img class="pfoto" alt="' + esc(p.nama) + '" loading="lazy" src="' + esc(p.foto) + '">' : '';
    return '<div class="p">' + img + '<h3>' + esc(p.lengkap) + '</h3><p>' + esc(p.ortu) + '</p>' + ig + '</div>';
  }
  $('#couple').innerHTML = person(CFG.groom) + '<div class="amp">&amp;</div>' + person(CFG.bride);

  $('#timeline').innerHTML = CFG.journey.map(function (j) {
    return '<li><small>' + esc(j.fase) + '</small><h3>' + esc(j.judul) + '</h3><p>' + esc(j.teks) + '</p></li>';
  }).join('');

  $('#events').innerHTML = CFG.acara.map(function (a) {
    return '<div class="card"><h3>' + esc(a.nama) + '</h3><p>' + esc(a.hari) + '</p><p class="no">' + esc(a.jam) +
      '</p><p><b>' + esc(a.lokasi) + '</b><br>' + esc(a.alamat) + '</p>' +
      '<a class="btn" target="_blank" rel="noopener" href="' + esc(a.maps) + '">Google Maps</a></div>';
  }).join('');

  if (CFG.livestream.aktif) { $('#live').hidden = false; $('#liveLink').href = CFG.livestream.link; }
  if (CFG.filterIG.aktif) { $('#igfilter').hidden = false; $('#igLink').href = CFG.filterIG.link; }
  if (CFG.galeri.length) {
    $('#galeri').hidden = false;
    /* [UBAH] galeri: geser terus tanpa henti (marquee) */
    var gImgs = CFG.galeri.map(function (u) { return '<img alt="" src="' + esc(u) + '">'; }).join('');
    var rep = Math.max(1, Math.ceil(6 / CFG.galeri.length)), gSet = '';
    for (var gi = 0; gi < rep; gi++) gSet += gImgs;
    $('#gallery').innerHTML = '<div class="marquee-track">' + gSet + gSet + '</div>';
    $('#gallery .marquee-track').style.animationDuration = (CFG.galeri.length * rep * 5) + 's';
  }

  $('#banks').innerHTML = CFG.bank.map(function (b, i) {
    return '<div class="card"><h3>' + esc(b.bank) + '</h3><p class="no" id="nr' + i + '">' + esc(b.norek) +
      '</p><p>a.n. ' + esc(b.atasNama) + '</p><button class="btn ghost" data-copy="#nr' + i + '">Salin Rekening</button></div>';
  }).join('');
  $('#aNama').textContent = CFG.alamatKado.penerima;
  $('#aAlamat').textContent = CFG.alamatKado.alamat;
  $('#aHp').textContent = CFG.alamatKado.hp;

  /* ---------- kalender ---------- */
  function fmt(d) { return new Date(d).toISOString().replace(/[-:]|\.\d{3}/g, ''); }
  $('#btnCal').href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(CFG.title) +
    '&dates=' + fmt(CFG.mulai) + '/' + fmt(CFG.selesai) +
    '&location=' + encodeURIComponent(CFG.acara[0] ? CFG.acara[0].lokasi + ', ' + CFG.acara[0].alamat : '');

  /* ---------- countdown ---------- */
  var target = new Date(CFG.mulai).getTime();
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function tick() {
    var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
    $('#cdD').textContent = pad(Math.floor(s / 86400));
    $('#cdH').textContent = pad(Math.floor(s % 86400 / 3600));
    $('#cdM').textContent = pad(Math.floor(s % 3600 / 60));
    $('#cdS').textContent = pad(s % 60);
  }
  tick(); setInterval(tick, 1000);

  /* ---------- buka undangan + musik ---------- */
  var audio = $('#audio'), btnMusic = $('#btnMusic');
  if (CFG.musik) audio.src = CFG.musik;
  $('#tombol-buka').onclick = function () {
    $('#cover').classList.add('open');
    document.body.classList.remove('locked');
    window.scrollTo(0, 0);
    startReveal();   /* [BARU] mulai animasi scroll setelah undangan dibuka */
    if (CFG.musik) {
      btnMusic.hidden = false;
      audio.play().then(function () { btnMusic.classList.add('spin'); }).catch(function () {});
    }
    setTimeout(function () { $('#cover').style.display = 'none'; }, 950);
  };
  btnMusic.onclick = function () {
    if (audio.paused) { audio.play(); btnMusic.classList.add('spin'); }
    else { audio.pause(); btnMusic.classList.remove('spin'); }
  };

  /* ---------- salin teks ---------- */
  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(t).catch(function () { legacy(t); });
    legacy(t);
  }
  function legacy(t) {
    var a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = 0;
    document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch (e) {} a.remove();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (b) {
      copyText($(b.dataset.copy).textContent.trim());
      var old = b.textContent; b.textContent = 'Tersalin \u2713'; setTimeout(function () { b.textContent = old; }, 1500);
    }
    if (e.target.classList.contains('modal')) $('#lightbox').hidden = true;
    if (e.target.closest('#gallery img')) { $('#lbImg').src = e.target.src; $('#lightbox').hidden = false; }
  });

  /* ---------- gift ---------- */
  $('#btnGift').onclick = function () { $('#giftBox').hidden = !$('#giftBox').hidden; };

  /* ---------- kirim ke server (Google Apps Script API) ---------- */
  var API = CFG.apiUrl && CFG.apiUrl.indexOf('http') === 0 ? CFG.apiUrl : '';
  $('#formWish').onsubmit = function (e) {
    e.preventDefault();
    var btn = $('#btnWish'), msg = $('#msgWish');
    if (!API) { msg.className = 'msg err'; msg.textContent = 'apiUrl belum diisi di config.js'; return; }
    btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Mengirim...';
    fetch(API, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ nama: $('#wNama').value, konfirmasi: $('#wKet').value, acara: 'Semua Acara', jumlah: 1, ucapan: $('#wUcapan').value }) })
      .then(function (r) { return r.json(); })
      .then(function (r) {
        if (!r.ok) throw new Error(r.error || 'Gagal mengirim, coba lagi.');
        msg.textContent = 'Ucapan terkirim. Terima kasih!'; $('#wUcapan').value = ''; loadWishes();
      })
      .catch(function (err) { msg.className = 'msg err'; msg.textContent = err.message || 'Gagal mengirim, coba lagi.'; })
      .then(function () { btn.disabled = false; });
  };

  /* ---------- WhatsApp ---------- */
  function wa(text) { window.open('https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(text), '_blank'); }

  /* ---------- daftar ucapan ---------- */
  function loadWishes() {
    if (!API) return;
    fetch(API).then(function (r) { return r.json(); }).then(function (r) {
      $('#stTotal').textContent = r.total; $('#stHadir').textContent = r.hadir; $('#stTidak').textContent = r.tidak; $('#stRagu').textContent = r.ragu;
      $('#wishList').innerHTML = r.items.map(function (w) {
        return '<li><b>' + esc(w.nama) + '</b><span class="tag">' + esc(w.ket) + '</span><p>' + esc(w.ucapan) + '</p><small>' + esc(w.waktu) + '</small></li>';
      }).join('') || '<li>Belum ada ucapan. Jadilah yang pertama!</li>';
    }).catch(function () {});
  }
  loadWishes();

  /* ---------- [BARU] animasi muncul saat scroll ---------- */
  var revealList = [];
  function prepareReveal() {
    var groups = [
      ['#hero > *', 'up', .15],
      ['.sec > h2', 'up', 0],
      ['.sec > p', 'up', 0],
      ['.sec > .btn', 'up', 0],
      ['.sec > .form', 'up', 0],
      ['#journeyImg', 'zoom', 0],
      ['.couple .p', 'up', 0],
      ['.couple .amp', 'zoom', 0],
      ['.timeline li', 'left', .12],
      ['.cd div', 'zoom', .12],
      ['#events .card', 'up', .15],
      ['.stats div', 'zoom', .1],
      ['#gallery', 'up', 0]
    ];
    groups.forEach(function (g) {
      Array.prototype.forEach.call(document.querySelectorAll(g[0]), function (el, i) {
        if (el.classList.contains('reveal')) return;
        el.classList.add('reveal', g[1]);
        el._rv = { fx: g[1], delay: g[2] * i };
        el.style.transitionDelay = el._rv.delay + 's';
        revealList.push(el);
      });
    });
  }
  /* [UBAH] animasi berulang: muncul saat masuk layar, di-reset saat keluar layar (scroll atas / bawah) */
  function showEl(el) {
    clearTimeout(el._t);
    el.style.transitionDelay = el._rv.delay + 's';
    el.classList.add('in');
    el._t = setTimeout(function () { el.style.transitionDelay = '0s'; }, 1100 + el._rv.delay * 1000);   /* hover tombol tidak ikut delay */
  }
  function hideEl(el) {
    clearTimeout(el._t);
    el.style.transitionDelay = '0s';
    el.classList.remove('in');
  }
  var revealStarted = false;
  function startReveal() {
    if (revealStarted) return; revealStarted = true;
    if (!('IntersectionObserver' in window)) { revealList.forEach(showEl); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.intersectionRatio >= .15) showEl(en.target);
        else if (!en.isIntersecting) hideEl(en.target);
      });
    }, { threshold: [0, .15], rootMargin: '0px 0px -6% 0px' });
    setTimeout(function () { revealList.forEach(function (el) { io.observe(el); }); }, 300);
  }
  prepareReveal();

  /* ---------- [BARU] bar progres scroll ---------- */
  var prog = $('#progress'), ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return; ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      prog.style.setProperty('--p', h > 0 ? Math.min(1, window.scrollY / h) : 0);
      ticking = false;
    });
  }, { passive: true });

})();
