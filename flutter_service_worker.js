'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "6fa4ae730d0d13d00f4e9a1bf2e8a794",
"assets/assets/images/faceid.png": "ba3a03497ded4f9e431aad80258758f1",
"assets/assets/images/faceid_white.png": "b9866038157b01f911aa63ece63c64ed",
"assets/assets/images/footer.png": "e1262b14f9bc9bb9c58b8c791a6e0f49",
"assets/assets/images/header.jpg": "5a4e8a928e979bc358157ea1c6c9e979",
"assets/assets/images/homescreen/account.png": "a85dbd71f8f688bc1cf0d3c207c7d6b2",
"assets/assets/images/homescreen/order.png": "1d5af36f334902b6c46db4404a7867b7",
"assets/assets/images/homescreen/purchase.png": "4d1e37254a0ed756e0a2ef004855d1bf",
"assets/assets/images/homescreen/report.png": "54e2b5390383dd799a93fa79eb78384b",
"assets/assets/images/homescreen/sales.png": "b062a1ae589a53b89cd0c333008a83b6",
"assets/assets/images/homescreen/user.png": "4979a3f2ac2cb7cba8457c491ac69e78",
"assets/assets/images/homescreen/warehouse.png": "2bcb7dfce691957046e91f25ba1bd819",
"assets/assets/images/login/bg-login.jpg": "20c6a314b396623d8b8769e2808b7fcc",
"assets/assets/images/login/btn-facefinger.png": "62b3a7c39060d68f3b747c983d7827a2",
"assets/assets/images/login/icon-password.png": "b5df2e43dd331bfa05b8363063066c69",
"assets/assets/images/login/icon-username.png": "3c6bfd458cfe41a2341568f29a3acce4",
"assets/assets/images/login/textbox.png": "4ac822110e1c9f4f6cff7e1c25fc1f43",
"assets/assets/images/logofami.png": "7f2b595c36421d81731a9fd8c5b0b103",
"assets/assets/images/navbar/home_off.png": "b6810a57fbe45960c74b67891e4a5d28",
"assets/assets/images/navbar/home_on.png": "c350769cce4739ec157d13aaca8fff3a",
"assets/assets/images/navbar/logo_footer.png": "c0eb31ace3d5272495e885c1c503f25d",
"assets/assets/images/navbar/notification_new.png": "b30669b5477712ad2456b3ac525e464b",
"assets/assets/images/navbar/notification_none.png": "a9aa05173e6fe2cd5704bb6e75fa3bd9",
"assets/assets/images/navbar/notification_off.png": "b981302a77c19f5341f97fc5d862e758",
"assets/assets/images/navbar/notification_on.png": "8df76130c2a2822cf41772a43f9f49fd",
"assets/assets/images/navbar/qoutation_off.png": "a1e77526ab126349ef33f30504497970",
"assets/assets/images/navbar/qoutation_on.png": "13b225121bb8f3350c829d091675649b",
"assets/assets/images/navbar/setting_off.png": "d4d21214accd704d3f917e75b50c7928",
"assets/assets/images/navbar/setting_on.png": "2e6c63fe2a9fa8a06e410a4ccdadd177",
"assets/assets/images/splash/splash-screen.jpg": "edea6258271e8c8c4ac0a554148d2077",
"assets/assets/translations/en.json": "0c44564eef33dc1d26e917482af4278f",
"assets/assets/translations/vi.json": "50deaf03f76b7448fcac57ac4fc1a0e6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "fd63f0b6a0acc92641c0ec74a0c22285",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en-US.json": "5bd908341879a431441c8208ae30e4fd",
"assets/packages/easy_localization/i18n/en.json": "5bd908341879a431441c8208ae30e4fd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "c882d9ee5b2395353e255c696016ec6d",
"/": "c882d9ee5b2395353e255c696016ec6d",
"main.dart.js": "1d4370239cedcd7eb8e64e8cb9cbb56c",
"manifest.json": "70dfe0935bac2a730f362945a1cc3468",
"version.json": "8778d3070421b8361c1c66db2dfb308a"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
