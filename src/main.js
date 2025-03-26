import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { initializeApp } from "firebase/app";

import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "./api";

import App from "./App.vue";
import router from "./router";

const firebaseConfig = {
  apiKey: "AIzaSyBsGPE7aaxIm5FsWY4aez_X7B25XgT-Q6A",
  authDomain: "jwt-firebase-vue3-d2e85.firebaseapp.com",
  projectId: "jwt-firebase-vue3-d2e85",
  storageBucket: "jwt-firebase-vue3-d2e85.firebasestorage.app",
  messagingSenderId: "787171272068",
  appId: "1:787171272068:web:13f5d258efa169290729d1",
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
