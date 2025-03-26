import { ref } from "vue";
import { defineStore } from "pinia";
import axiosApiInstance from "../api";

const API_KEY = import.meta.env.VITE_API_KEY_FIREBASE;

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({
    token: "",
    email: "",
    userId: "",
    refreshToken: "",
  });

  const error = ref("");
  const loader = ref(false);

  const auth = async (payload, type) => {
    const strUrl = type === "signup" ? "signUp" : "signInWithPassword";

    error.value = "";
    loader.value = true;

    try {
      let response = await axiosApiInstance.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:${strUrl}?key=${API_KEY}`,
        {
          ...payload,
          returnSecureToken: true,
        }
      );

      userInfo.value = {
        token: response.data.idToken,
        email: response.data.email,
        userId: response.data.localId,
        refreshToken: response.data.refreshToken,
      };

      localStorage.setItem(
        "userTokens",
        JSON.stringify({
          token: userInfo.value.token,
          refreshToken: userInfo.value.refreshToken,
        })
      );
    } catch (err) {
      error.value = "Error";

      // switch (err.response.data.error.message) {
      //   case "EMAIL_EXISTS":
      //     error.value = "Email exists";
      //     break;
      //   case "OPERATION_NOT_ALLOWED":
      //     error.value = "OPERATION NOT ALLOWED";

      //     break;
      //   case "TOO_MANY_ATTEMPTS_TRY_LATER":
      //     error.value = "TOO MANY ATTEMPTS TRY LATER";

      //     break;
      //   case "EMAIL_NOT_FOUND":
      //     error.value = "EMAIL NOT FOUND";

      //     break;
      //   case "INVALID_PASSWORD":
      //     error.value = "INVALID PASSWORD";

      //     break;
      //   case "USER_DISABLED":
      //     error.value = "USER DISABLED";

      //     break;
      //   default:
      //     error.value = "Error";
      //     break;
      // }
      throw error.value;
    } finally {
      loader.value = false;
    }
  };

  const logout = () => {
    userInfo.value = { token: "", email: "", userId: "", refreshToken: "" };
  };
  return { auth, userInfo, error, loader, logout };
});
