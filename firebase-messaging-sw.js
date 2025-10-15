importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyAShr1W6im1gM3dNmlEqtqEQzxns0bb-r8",
  authDomain: "smarthealthapp-3d6a1.firebaseapp.com",
  projectId: "smarthealthapp-3d6a1",
  storageBucket: "smarthealthapp-3d6a1.firebasestorage.app",
  messagingSenderId: "49817159971",
  appId: "1:49817159971:web:2e7664ac5a2bcbe8b2a496",
  measurementId: "G-PJJL2MQGZ8"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function(payload) {
  console.log("[firebase-messaging-sw.js] Received background message ", payload)
  const title = payload.notification?.title || "Background Notification"
  const options = { body: payload.notification?.body || "" }
  self.registration.showNotification(title, options)
})
