importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDOYkNpYREuHxAFehPyZwNKKE4ADZLFcLU",
  authDomain: "fcm-test-b42f0.firebaseapp.com",
  projectId: "fcm-test-b42f0",
  messagingSenderId: "720846843703",
  appId: "1:720846843703:web:11e172ab98ab433c1874b2",
});

const messaging = firebase.messaging();

// 백그라운드 메시지 수신
messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification || {};
  const data = payload.data || {};
  self.registration.showNotification(title || 'Notification', { body, data });
});

// 알림 클릭 라우팅 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientsArr) => {
      for (const client of clientsArr) {
        if ('focus' in client) {
          client.postMessage({ type: 'notification-click', data: event.notification.data });
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});