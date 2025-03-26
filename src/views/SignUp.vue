<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Message from "primevue/Message";
import Loader from "@/components/Loader.vue";

const authStore = useAuthStore();
const router = useRouter();

const email = ref();
const password = ref();

const signup = async () => {
  await authStore.auth(
    { email: email.value, password: password.value },
    "signup"
  );
  router.push("/cars");
};
</script>

<template>
  <h2>Sign Up</h2>
  <form class="flex flex-column gap-3">
    <Message v-if="authStore.error" severity="warn">{{
      authStore.error
    }}</Message>

    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-user"></i>
      </span>
      <InputText type="email" v-model="email" placeholder="Your Email" />
    </div>
    <div class="p-inputgroup flex-1">
      <span class="p-inputgroup-addon">
        <i class="pi pi-at"></i>
      </span>
      <InputText
        class="inptext"
        type="password"
        v-model="password"
        placeholder="Password"
      />
    </div>
    <div class="flex flex-column gap-3">
      <Loader v-if="authStore.loader" />
      <Button v-else label="Signup" @click="signup" />
      <span
        >Are you already registered?
        <router-link to="/signin">Sign in</router-link></span
      >
    </div>
  </form>
</template>

<style>
.p-inputgroup {
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid lightgrey;
  border-radius: 7px;
  padding-left: 15px;
}

.p-inputtext {
  flex-grow: 1;
}
</style>
