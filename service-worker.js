// TRONOS — Service Worker (cache para jogo offline)
const CACHE = "tronos-v80-caixa-territorio";
const CORE = [
  "./index.html",
  "./manifest.json",
  "./assets/game.js",
  "./assets/audio/trilha.mp3",
  "./assets/faccoes/simbolo_cs.png",
  "./assets/faccoes/simbolo_fd.png",
  "./assets/faccoes/simbolo_cv.png",
  "./assets/faccoes/chefe_cs.jpg",
  "./assets/faccoes/chefe_fd.jpg",
  "./assets/faccoes/chefe_cv.jpg",
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
