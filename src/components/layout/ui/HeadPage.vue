<template>
  <div class="breadcrumb flex items-center justify-between border-b border-gray-300 dark:border-foreground pb-4 mb-6">
    <!-- المسار -->
    <ul class="flex items-center text-l">
      <li class="border-r border-gray-400 pr-2 dark:text-gray-400">
        <a class="hover:text-gray-800" href="#">{{ part }}</a>
      </li>
      <li class="pl-2 text-gray-600 dark:text-gray-400">{{ title }}</li>
    </ul>
    <div v-if="showButton">
      <Btn :btnTitle="btnTitle" :href="href" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

const props = defineProps({
  part: String,
  title: String,
  enableBtn: {
    type: Boolean,
    default: false,
  },
  btnTitle: {
    type: String,
    default: 'Add',
  },
  href: {
    type: String,
    default: '#',
  },
})
const userStore = useUserStore()
const showButton = computed(() => props.enableBtn && userStore.isAuthenticated && userStore.userRole=='organizer')
</script>
