﻿(function () {
	'use strict';

	// Update 'version' if you need to refresh the cache
	var version = '1.0::ServiceWorker';
	var offlineUrl = "/offline";

	// Store core files in a cache (including a page to display when offline)
	function updateStaticCache() {
		return caches.open(version)
			.then(function (cache) {
				return cache.addAll([
					offlineUrl,
					"rom/game.gb",
					"css/offline.css",
					"js/other/mobile.js",
					"js/other/base64.js",
					"js/other/swfobject.js",
					"js/other/resampler.js",
					"js/other/XAudioServer.js",
					"js/other/controls.js",
					"js/other/resize.js",
					"js/GameBoyCore.js",
					"js/GameBoyIO.js",
					"favicon.ico"
				]);
			});
	}

	self.addEventListener('install', function (event) {
		event.waitUntil(updateStaticCache());
	});

	self.addEventListener('activate', function (event) {
		event.waitUntil(
			caches.keys()
				.then(function (keys) {
					// Remove caches whose name is no longer valid
					return Promise.all(keys
						.filter(function (key) {
							return key.indexOf(version) !== 0;
						})
						.map(function (key) {
							return caches.delete(key);
						})
					);
				})
		);
	});

	self.addEventListener('fetch', function (event) {
		var request = event.request;

		// Always fetch non-GET requests from the network
		if (request.method !== 'GET') {
			event.respondWith(
				fetch(request)
					.catch(function () {
						return caches.match(offlineUrl);
					})
			);
			return;
		}

		event.respondWith(
			fetch(request)
				.then(function (response) {
					return response;
				})
				.catch(function () {
					return caches.match(request)
						.then(function (response) {
							return response || caches.match(offlineUrl);
						})
						.catch(function () {
							if (request.headers.get('Accept').indexOf('image') !== -1) {
								return new Response('<svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
							}
						});
				})
		);

	});

})();