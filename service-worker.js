const CACHE_NAME = 'taskflow-v1';
// Lista de arquivos para cache (incluindo o HTML, o manifesto e os ícones)
const urlsToCache = [
  './simple_todo_apk.html',
  './manifest.json',
  // O Service Worker fará cache desses nomes de arquivo (você precisará criá-los)
  './icon-192x192.png', 
  './icon-512x512.png'
];

self.addEventListener('install', (event) => {
  // Executa o cache de todos os recursos essenciais durante a instalação
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Arquivos pré-armazenados para uso offline.');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
          console.error('Service Worker: Falha ao armazenar em cache', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepta requisições e retorna a versão em cache, se disponível
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna o cache se ele existir
        if (response) {
          return response;
        }
        // Caso contrário, busca na rede
        return fetch(event.request);
      })
  );
});
