// TRONOS — Service Worker (cache para jogo offline)
const CACHE = "tronos-v101-personagens-cores";
const CORE = [
  "./index.html",
  "./manifest.json",
  "./assets/game.js",
  "./assets/audio/trilha.mp3",
  "./assets/ui/menu.jpg",
  "./assets/icons/icon-180.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/faccoes/simbolo_cs.png",
  "./assets/faccoes/simbolo_fd.png",
  "./assets/faccoes/simbolo_cv.png",
  "./assets/faccoes/chefe_cs.jpg",
  "./assets/faccoes/chefe_fd.jpg",
  "./assets/faccoes/chefe_cv.jpg",
  "./assets/faccoes/gerente_cs_1.jpg",
  "./assets/faccoes/gerente_cs_2.jpg",
  "./assets/faccoes/gerente_cs_3.jpg",
  "./assets/faccoes/gerente_cs_4.jpg",
  "./assets/faccoes/gerente_fd_1.jpg",
  "./assets/faccoes/gerente_fd_2.jpg",
  "./assets/faccoes/gerente_fd_3.jpg",
  "./assets/faccoes/gerente_fd_4.jpg",
  "./assets/faccoes/gerente_cv_1.jpg",
  "./assets/faccoes/gerente_cv_2.jpg",
  "./assets/faccoes/gerente_cv_3.jpg",
  "./assets/faccoes/gerente_cv_4.jpg",
  "./assets/faccoes/pjger_1.jpg",
  "./assets/faccoes/pjger_2.jpg",
  "./assets/faccoes/pjger_3.jpg",
  "./assets/faccoes/pjger_4.jpg",
  "./assets/arsenal/p1.png",
  "./assets/arsenal/p2.png",
  "./assets/arsenal/p3.png",
  "./assets/arsenal/p4.png",
  "./assets/arsenal/r1.png",
  "./assets/arsenal/r2.png",
  "./assets/arsenal/r3.png",
  "./assets/arsenal/r4.png",
  "./assets/arsenal/m1.png",
  "./assets/arsenal/m2.png",
  "./assets/arsenal/m3.png",
  "./assets/arsenal/m4.png",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://cdn.tailwindcss.com",
];

// Instala: faz cache do núcleo
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE).catch(() => {})).then(() => self.skipWaiting())
  );
});

// Ativa: limpa caches antigos
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Busca: cache-first para o núcleo, network-first para imagens (fotos novas aparecem)
self.addEventListener("fetch", (e) => {
  const url = e.request.url;
  const isAsset = url.includes("/assets/bens/") || url.includes("/assets/personagens/");

  if (isAsset) {
    // network-first: tenta baixar a foto; se falhar, usa cache; se não tiver, deixa o app cair no SVG
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // cache-first para o resto
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
