<script setup>
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.userInfo?.token);
</script>

<template>
  <main>
    <div class="home">
      <h1>Добро пожаловать!</h1>
      <p>Это главная страница нашего приложения.</p>

      <div v-if="!isAuthenticated" class="auth-links">
        <p>
          Чтобы получить доступ ко всем возможностям, войдите или
          зарегистрируйтесь:
        </p>
        <router-link to="/signin" class="btn">Войти</router-link>
        <router-link to="/signup" class="btn">Зарегистрироваться</router-link>
      </div>

      <div v-else>
        <h2>Рады видеть тебя снова!</h2>
        <p>Перейди в раздел "Машины", чтобы увидеть доступные автомобили:</p>
        <router-link to="/cars" class="btn"
          >Перейти в раздел "Машины"</router-link
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin: 1rem 0;
}

.auth-links {
  margin-top: 1rem;
}

.btn {
  display: inline-block;
  margin: 0.5rem;
  padding: 0.8rem 1.5rem;
  color: #fff;
  background-color: #4caf50;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s ease;
}

.btn:hover {
  background-color: #45a049;
}
</style>
