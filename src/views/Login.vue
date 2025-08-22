<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Login </h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <!-- <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label> -->
                    <!-- <input v-model="name" type="text" class="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white" required /> -->
                    <InputField v-model="email" type="email" placeholder="Enter your email" />

                </div>
                <div class="mb-4">
                    <!-- <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label> -->
                    <!-- <input v-model="name" type="text" class="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white" required /> -->
                    <InputField v-model="password" type="password" placeholder="password" />

                </div>
                <!-- <div class="relative w-full flex items-center mb-6">
                    <span class="absolute right-3 text-gray-400 pointer-events-none">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <select v-model="role"
                        class="appearance-none w-full pr-10 pl-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="organizer">organizer</option>
                        <option value="audience">audience</option>
                    </select>
                </div> -->

                <button type="submit"
                    class="w-full bg-background-primary text-primary-text py-2 rounded hover:bg-secondary transition">sign in</button>
                
                <div class="mt-4 text-center">
                    <p class="text-gray-600 dark:text-gray-400">
                        Don't have an account? 
                        <router-link to="/register" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Register here
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import services from '@/services'

const email = ref('')
const password = ref('')
const role = ref('user')
const successMessage = ref('')
const error = ref('')
const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()

async function handleLogin() {
    loading.value = true
    error.value = ''

    try {
        console.log('Attempting login with:', { email: email.value, password: '***' });
        
        const response = await services.AuthService.login({
          email: email.value,
          password: password.value
        });
        
        console.log('Login response:', response);
        
        const data = response.data;
        
        if (data.message === 'Login successful') {
          console.log(data.user);
          // Store user data in localStorage or Vuex store
            userStore.login({
                email: data.user.email,
                role: data.user.roles[0],
                avatar: "images/person-1.png",
            })
        //   localStorage.setItem('user', JSON.stringify(data.user));
          
          // Emit login success event to parent component
        //   this.$emit('login-success', data.user);
          
          // Clear form
          email.value = '';
          password.value = '';
          
          sessionStorage.setItem('loginSuccess', 'true') // ✅ Set flag

          // Redirect after short delay
          router.push('/')
        } else {
          error.value = data.error || 'حدث خطأ أثناء تسجيل الدخول';
        }
      } catch (err) {
        console.error('Login error:', err);
        error.value = err.response?.data?.error || 'خطأ في الاتصال بالسيرفر';
      } finally {
        loading.value = false;
      }
}
</script>
