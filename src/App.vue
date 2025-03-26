<script setup>
import { computed } from "vue";
import { RouterView, useRouter } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const token = computed(() => authStore.userInfo.token);

const checkUser = () => {
  const tokens = JSON.parse(localStorage.getItem("userTokens"));

  if (tokens) {
    authStore.userInfo = {
      ...authStore.userInfo,
      ...tokens,
    };
  }
};

const logout = () => {
  authStore.logout();
  localStorage.removeItem("userTokens");
  router.push("/");
};

checkUser();
</script>

<template>
  <div class="menu">
    <RouterLink class="menu__link" to="/">Home</RouterLink>
    <RouterLink class="menu__link" v-if="!token" to="/signin"
      >Sign In</RouterLink
    >
    <RouterLink class="menu__link" v-if="!token" to="/signup"
      >Sign Up</RouterLink
    >

    <RouterLink class="menu__link" v-if="token" to="/cars">Cars</RouterLink>
    <RouterLink class="menu__link" v-if="token" to="/" @click.prevent="logout"
      >Logout</RouterLink
    >
  </div>
  <div class="container"><RouterView /></div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
  font-family: Arial, Helvetica, sans-serif;
}

.menu {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 20px;
  font-size: 20px;
}

.menu__link {
  color: #000;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
