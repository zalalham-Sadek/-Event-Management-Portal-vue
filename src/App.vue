<template>
  <div>
    <!-- Topbar -->

<Topbar :sidebarOpen="sidebarOpen" @update:sidebarOpen="sidebarOpen = $event" :sidebarCollapsed="sidebarCollapsed" />
<Sidebar
  v-model:sidebarOpen="sidebarOpen"
  v-model:sidebarCollapsed="sidebarCollapsed"
/>


    <!-- Main Content -->
    <main class="pt-16 transition-all duration-300 " :class="sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'">
      <router-view></router-view>
    </main>
  </div>
  
</template>

<script setup>
import { ref } from 'vue'

const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
</script>

<style scoped>
.size-10 {
  width: 40px;
  height: 40px;
}
</style>
