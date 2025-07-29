<template>
  <!-- Sidebar -->
  <aside
    class="fixed top-0 left-0 h-full bg-background-primary pt-5 z-40 transition-all duration-300 ease-in-out overflow-hidden"
    :class="[
      sidebarCollapsed ? 'w-20' : 'w-64',
      sidebarOpen ? 'translate-x-0' : '-translate-x-full',
      'md:translate-x-0'
    ]">

    <div class="flex  items-center text-white px-4" :class="[sidebarCollapsed ? 'justify-center' : 'justify-between']">

      <TopSideBar :sidebarCollapsed="sidebarCollapsed" />

      <!-- Collapse button (desktop only) -->

      <BtnToggle :toggleCollapse="toggleCollapse" :sidebarCollapsed="sidebarCollapsed" />


      <!-- Close button (mobile only) -->
      <button @click="closeSidebar" class="md:hidden text-white text-2xl">
        &times;
      </button>
    </div>

    <!-- list sidebar -->

    <ListSideBar :sidebarCollapsed="sidebarCollapsed" />

    <!-- <nav class="mt-4 space-y-5 text-white px-2 py-4">
      <a href="#" class="flex items-center justify-center gap-3 text-primary"><span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
            <path fill="currentColor"
              d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
          </svg>

        </span><span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span></a>
      <a href="#" class="flex items-center justify-center gap-3 text-primary"><span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
            <path fill="currentColor"
              d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
          </svg>
        </span><span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span></a>
      <a href="#" class="flex items-center justify-center gap-3 text-primary"><span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
            <path fill="currentColor"
              d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
          </svg>
        </span><span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span></a>
      <a href="#" class="flex items-center justify-center gap-3 text-primary"><span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
            <path fill="currentColor"
              d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
          </svg>
        </span><span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span></a>
    </nav> -->
  </aside>

  <!-- Mobile Overlay -->
  <div v-if="sidebarOpen" class="fixed inset-0 bg-opacity-50 z-30 md:hidden" @click="closeSidebar"></div>
</template>

<script setup>
import BtnToggle from './sidebar/BtnToggle.vue'
import ListSideBar from './sidebar/ListSideBar.vue'
import TopSideBar from './sidebar/TopSideBar.vue'

const props = defineProps({
  sidebarOpen: Boolean,           // v-model = sidebarOpen
  sidebarCollapsed: Boolean      // v-model:sidebarCollapsed
})
const emit = defineEmits(['update:sidebarOpen', 'update:sidebarCollapsed'])

function closeSidebar() {
  emit('update:sidebarOpen', false)
}

function toggleCollapse() {
  emit('update:sidebarCollapsed', !props.sidebarCollapsed)
}
</script>






<!-- 
<script setup>
import { ref } from 'vue'

// const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
</script> -->