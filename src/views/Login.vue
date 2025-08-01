<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Login </h2>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <!-- <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label> -->
                    <!-- <input v-model="name" type="text" class="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white" required /> -->
                    <InputField v-model="name" type="text" placeholder="Enter ypur name" />

                </div>
                <div class="relative w-full flex items-center mb-6">
                    <span class="absolute right-3 text-gray-400 pointer-events-none">
                        <i class="fas fa-chevron-down"></i>
                    </span>
                    <select v-model="role"
                        class="appearance-none w-full pr-10 pl-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary">
                        <option value="organizer">organizer</option>
                        <option value="audience">audience</option>
                    </select>
                </div>

                <button type="submit"
                    class="w-full bg-primary text-primary-text py-2 rounded hover:bg-secondary transition">sign in</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const name = ref('')
const role = ref('organizer')
const successMessage = ref('')

const userStore = useUserStore()
const router = useRouter()

function handleLogin() {
  userStore.login({
    name: name.value,
    role: role.value,
    avatar: "images/person-1.png",
  })

  sessionStorage.setItem('loginSuccess', 'true') // ✅ Set flag

  // Redirect after short delay
  
    router.push('/')
 
}

</script>
