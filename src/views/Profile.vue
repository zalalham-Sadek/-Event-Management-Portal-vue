<template>
  <div class="max-w-3xl mx-auto p-6 ">
<div class="backdrop-blur-md bg-white/30 dark:bg-gray-800/30 border border-white/20 shadow-2xl rounded-2xl p-6">
      <div class="flex items-center space-x-6">
        <!-- Avatar -->
        <img
          class="w-24 h-24 rounded-full border-4 border-primary object-cover"
          :src="user.avatar || defaultAvatar"
          alt="User Avatar"
        />

        <!-- User Info -->
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ user.name }}</h2>
          <p class="text-gray-600 dark:text-gray-300">{{ user.email }}</p>
          <span class="inline-block mt-2 px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {{ user.role || 'User' }}
          </span>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end gap-4">
        <button
  class="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transform hover:scale-105 transition"
  @click="editProfile"
>
  <i class="fas fa-user-edit"></i> Edit Profile
</button>

<button
  class="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transform hover:scale-105 transition"
  @click="logout"
>
  <i class="fas fa-sign-out-alt"></i> Logout
</button>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const user = userStore.user || {
  name: 'Guest User',
  email: 'guest@example.com',
  role: 'Visitor',
}

const defaultAvatar = 'https://ui-avatars.com/api/?name=Guest&background=0D8ABC&color=fff'

function logout() {
  userStore.logout()
  router.push('/login')
}

function editProfile() {
  // You can push to an edit-profile route or open a modal
  alert('Edit profile feature coming soon!')
}
</script>
