<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCV3lvVd31829ku_10vNc4z_f337LNztJc",
  authDomain: "teayudo-notificaciones.firebaseapp.com",
  projectId: "teayudo-notificaciones",
  storageBucket: "teayudo-notificaciones.appspot.com",
  messagingSenderId: "687576040078",
  appId: "1:687576040078:web:dad51affd6bb6b24ad7fdf",
  measurementId: "G-9CWR8HRHQE"
};


const app = initializeApp(firebaseConfig);


// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
  const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/icon.png'
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
});

function PedirToken(){
getToken(messaging, { vapidKey: 'BLZIW4YNjuwpWdNCHscBYmjUPGAiXHtMkAxSSEvpzPGu3N374NqzedbyhIeQyWE8VgQRN2V9V7M-iSnC8PejHDE' }).then((currentToken) => {
  if (currentToken) {
    // Send the token to your server and update the UI if necessary
    console.log("Token is:",currentToken);
    // ...
  } else {
    // Show permission request UI
    console.log('No registration token available. Request permission to generate one.');
    // ...
  }
}).catch((err) => {
  console.log('An error occurred while retrieving token. ', err);
  // ...
});
}

function ConcederPermiso(){
  
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted'){
      console.log("Permiso concedido");
    }
    else if (permission ==='denied'){
      console.log("Permiso no concedido");
      openNotificationSettings();
    }
    else{
      //
    }
  });
}

function openNotificationSettings() {
  let browser = getBrowser();
  let notificationSettingsURL;

  if (browser === 'chrome') {
    notificationSettingsURL = 'chrome://settings/content/notifications';
  } else if (browser === 'firefox') {
    notificationSettingsURL = 'about:preferences#privacy';
  } else if (browser === 'brave') {
    alert('Por favor, abre manualmente la configuración de notificaciones en tu navegador.');
  } else if (browser === 'other') {
    alert('Por favor, abre manualmente la configuración de notificaciones en tu navegador.');
    return;
  }

  window.open(notificationSettingsURL);
}

function getBrowser() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes('chrome')) {
    return 'chrome';
  } else if (userAgent.includes('firefox')) {
    return 'firefox';
  } else if (userAgent.includes('brave')) {
    return 'brave';
  }
  return 'other';
}

const message = {
  notification: {
    title: '',
    body: ''
  },
  token: deviceToken,
};

function EnviarMensaje(message){
  getMessaging().send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button @click="ConcederPermiso">Permiso para notificaciones</button>
    <button @click="PedirToken">Obtener token personal</button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
