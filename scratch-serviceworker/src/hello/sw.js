var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/scratch-vm-hello.js',
  '/project/09dc888b0b7df19f70d81588ae73420e.svg',
  '/project/195233767.json',
  '/project/3696356a03a8d938318876a593572843.svg',
  '/project/5c81a336fab8be57adc039a8a2b33ca9.png',
  '/project/739b5e2a2435f6e1ec2993791b423146.png',
  '/project/83a9787d4cb6f3b7632b4ddfebf74367.wav',
  '/project/83c36d806dc92327b9e7049a565c6bff.wav'
];
console.log("Hello, World 2!!");
self.addEventListener('install', function(event) {
  console.log('install');
  // インストール処理
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
/*
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
      	console.log(JSON.stringify(response));
        // キャッシュがあったのでそのレスポンスを返す
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
*/
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // キャッシュがあったのでレスポンスを返す
        if (response) {
          return response;
        }

        // 重要：リクエストを clone する。リクエストは Stream なので
        // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
        // 必要なので、リクエストは clone しないといけない
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // レスポンスが正しいかをチェック
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 重要：レスポンスを clone する。レスポンスは Stream で
            // ブラウザ用とキャッシュ用の2回必要。なので clone して
            // 2つの Stream があるようにする
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});