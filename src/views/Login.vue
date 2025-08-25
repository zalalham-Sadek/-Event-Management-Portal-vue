<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <!-- ✅ Toast -->
    <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

    <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <InputField v-model="email" type="email" placeholder="Enter your email" />
        </div>
        <div class="mb-4">
          <InputField v-model="password" type="password" placeholder="Password" />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-background-primary text-primary-text py-2 rounded hover:bg-secondary transition flex items-center justify-center"
        >
          <!-- ✅ Loader داخل الزر -->
          <span v-if="loading" class="loader mr-2"></span>
          <span>{{ loading ? "Signing in..." : "Sign in" }}</span>
        </button>

        <div class="mt-4 text-center">
          <p class="text-gray-600 dark:text-gray-400">
            Don't have an account?
            <router-link
              to="/register"
              class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Register here
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user";
import services from "@/services";
import ToastMessage from "@/components/layout/ui/ToastMessage.vue";

const email = ref("");
const password = ref("");
const role = ref("user");
const loading = ref(false);

// ✅ Toast state
const toastMessage = ref("");
const toastVisible = ref(false);
const toastType = ref("success"); // success | error | info

const userStore = useUserStore();
const router = useRouter();

function showToast(message, type = "info") {
  toastMessage.value = message;
  toastType.value = type;
  toastVisible.value = true;

  setTimeout(() => {
    toastVisible.value = false;
  }, 3000); // auto hide
}

async function handleLogin() {
  // ✅ التحقق من الحقول قبل الإرسال
  if (!email.value || !password.value) {
    showToast("⚠️ Please fill in all required fields", "error");
    return;
  }

  loading.value = true;

  try {
    const response = await services.AuthService.login({
      email: email.value,
      password: password.value,
    });

    const data = response.data;

    if (data.message === "Login successful") {
      userStore.login({
        email: data.user.email,
        role: data.user.roles[0],
        name: data.user.name,
        avatar: "images/person-1.png",
      });

      email.value = "";
      password.value = "";

      sessionStorage.setItem("loginSuccess", "true");

      showToast("✅ Login successful!", "success");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      showToast(data.error || "حدث خطأ أثناء تسجيل الدخول", "error");
    }
  } catch (err) {
    console.error("Login error:", err);
    showToast(err.response?.data?.error || "خطأ في الاتصال بالسيرفر", "error");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* ✅ Loader بسيط */
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #333;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
