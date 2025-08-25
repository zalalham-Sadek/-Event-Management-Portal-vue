<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Register</h2>

            <form @submit.prevent="handleRegister">
                <div class="mb-4">
                    <InputField v-model="name" type="text" placeholder="Enter your full name" />
                </div>
                
                <div class="mb-4">
                    <InputField v-model="email" type="email" placeholder="Enter your email" />
                </div>
                
                <div class="mb-4">
                    <InputField v-model="password" type="password" placeholder="Enter your password" />
                </div>
                
                <div class="mb-4">
                    <InputField v-model="confirmPassword" type="password" placeholder="Confirm your password" />
                </div>

                <!-- <div class="mb-6">
                    <div class="relative w-full flex items-center">
                        <span class="absolute right-3 text-gray-400 pointer-events-none">
                            <i class="fas fa-chevron-down"></i>
                        </span>
                        <select v-model="role"
                            class="appearance-none w-full pr-10 pl-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary">
                            <option value="">Select your role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="organizer">Organizer</option>
                            <option value="audience">Audience</option>
                        </select>
                    </div>
]                    <div v-if="role" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Selected role: <span class="font-semibold">{{ role }}</span>
                    </div>
                </div> -->

                <!-- Error Message -->
                <div v-if="error" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {{ error }}
                </div>

                <!-- Success Message -->
                <div v-if="successMessage" class="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    {{ successMessage }}
                </div>

                <button 
                    type="submit"
                    :disabled="loading"
                    class="w-full bg-background-primary text-primary-text py-2 rounded hover:bg-secondary transition disabled:opacity-50 disabled:cursor-not-allowed">
                    {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
                
                <div class="mt-4 text-center">
                    <p class="text-gray-600 dark:text-gray-400">
                        Already have an account? 
                        <router-link to="/login" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            Sign in here
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

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const role = ref('user')
const successMessage = ref('')
const error = ref('')
const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()

async function handleRegister() {
    loading.value = true
    error.value = ''
    successMessage.value = ''

    // Validation
    if (!name.value || !email.value || !password.value || !confirmPassword.value || !role.value) {
        error.value = 'Please fill in all fields'
        loading.value = false
        return
    }

    if (password.value !== confirmPassword.value) {
        error.value = 'Passwords do not match'
        loading.value = false
        return
    }

    if (password.value.length < 6) {
        error.value = 'Password must be at least 6 characters long'
        loading.value = false
        return
    }

    try {
        console.log('Selected role:', role.value);
        console.log('Attempting registration with:', { 
            name: name.value, 
            email: email.value, 
            role: role.value, 
            password: '***' 
        });
        
        const registrationData = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirmPassword.value
        };
        
        console.log('Sending registration data:', registrationData);
        
        const response = await services.AuthService.register(registrationData);
        
        console.log('Registration response:', response);
        
        const data = response.data;
        
        if (data.message === 'Registration successful' || data.success) {
            successMessage.value = 'Account created successfully! Redirecting to login...'
            
            // Clear form
            name.value = '';
            email.value = '';
            password.value = '';
            confirmPassword.value = '';
            role.value = '';
            
            // Redirect to login after a short delay
            setTimeout(() => {
                router.push('/login')
            }, 2000)
        } else {
            error.value = data.error || 'Registration failed. Please try again.';
        }
    } catch (err) {
        console.error('Registration error:', err);
        error.value = err.response?.data?.error || 'An error occurred during registration. Please try again.';
    } finally {
        loading.value = false;
    }
}
</script>
