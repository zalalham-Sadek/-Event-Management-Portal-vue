<template>
  <!-- 🎉 Toast after login -->
  <ToastMessage
    message="Login success, welcome to the Event Management"
    :visible="showLoginSuccess"
    type="success"
  />

  <div class="p-6 space-y-10">
    <h2 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">📊 Analytics Dashboard</h2>

    <!-- 🎯 Key Metrics with Icons -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-blue-100 dark:bg-blue-900 p-6 rounded-2xl shadow flex items-center space-x-4">
        <div class="p-3 bg-blue-200 dark:bg-blue-700 rounded-full">
          <i class="fas fa-calendar fa-lg text-blue-800 dark:text-blue-300"></i>
        </div>
        <div>
          <p class="text-lg font-medium text-gray-700 dark:text-gray-100">Total Events</p>
          <p class="text-2xl font-bold text-blue-900 dark:text-white">{{ totalEvents }}</p>
        </div>
      </div>

      <div class="bg-green-100 dark:bg-green-900 p-6 rounded-2xl shadow flex items-center space-x-4">
        <div class="p-3 bg-green-200 dark:bg-green-700 rounded-full">
          <i class="fas fa-hourglass-half fa-lg text-green-800 dark:text-green-300"></i>
        </div>
        <div>
          <p class="text-lg font-medium text-gray-700 dark:text-gray-100">Upcoming Events</p>
          <p class="text-2xl font-bold text-green-900 dark:text-white">{{ upcomingEvents.length }}</p>
        </div>
      </div>

      <div class="bg-red-100 dark:bg-red-900 p-6 rounded-2xl shadow flex items-center space-x-4">
        <div class="p-3 bg-red-200 dark:bg-red-700 rounded-full">
          <i class="fas fa-user-slash fa-lg text-red-800 dark:text-red-300"></i>
        </div>
        <div>
          <p class="text-lg font-medium text-gray-700 dark:text-gray-100">Events Without Speakers</p>
          <p class="text-2xl font-bold text-red-900 dark:text-white">{{ eventsWithoutSpeakers.length }}</p>
        </div>
      </div>
    </div>

    <!-- 📍 Events by Location -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">📍 Events by Location</h3>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <BaseBarChart :chartData="eventsLocationData" :chartOptions="chartOptions" />
      </div>
    </div>
    <!-- 📆 Events by Month (Doughnut Chart) -->
<div class="mt-12">
  <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">📆 Events by Month</h3>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
    <BaseDoughnutChart :chartData="eventsByMonthData" :chartOptions="chartOptions" />
  </div>
</div>


    <!-- 👤 Speakers by Event Count -->
    <div class="mt-12">
      <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">👤 Top Speakers by Event Count</h3>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
        <BaseBarChart :chartData="speakersEventData" :chartOptions="chartOptions" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/store/user'
import ToastMessage from '@/components/layout/ui/ToastMessage.vue'
import BaseBarChart from '@/components/layout/ui/BarChart.vue'
import BaseDoughnutChart from '@/components/layout/ui/BaseDoughnutChart.vue'

// 📦 State
const events = ref([])
const speakers = ref([])
const showLoginSuccess = ref(false)
const userStore = useUserStore()

onMounted(() => {
  events.value = JSON.parse(localStorage.getItem('events') || '[]')
  speakers.value = JSON.parse(localStorage.getItem('speakers') || '[]')
  userStore.loadUserFromStorage()

  if (sessionStorage.getItem('loginSuccess') === 'true') {
    showLoginSuccess.value = true
    sessionStorage.removeItem('loginSuccess')
    setTimeout(() => {
      showLoginSuccess.value = false
    }, 2000)
  }
})

// 📊 Analytics
const totalEvents = computed(() => events.value.length)
const upcomingEvents = computed(() => events.value.filter(e => new Date(e.date) > new Date()))
const eventsWithoutSpeakers = computed(() => events.value.filter(e => !e.speakerIds || e.speakerIds.length === 0))
const eventsByLocation = computed(() => {
  const result = {}
  events.value.forEach(e => {
    result[e.location] = (result[e.location] || 0) + 1
  })
  return result
})

const totalSpeakers = computed(() => speakers.value.length)
const speakersByEventCount = computed(() =>
  speakers.value
    .map(s => ({ id: s.id, name: s.name, events: s.eventIds ? s.eventIds.length : 0 }))
    .sort((a, b) => b.events - a.events)
)

// 📈 Charts
const eventsLocationData = computed(() => ({
  labels: Object.keys(eventsByLocation.value),
  datasets: [{
    label: 'Events per Location',
    backgroundColor: '#3b82f6',
    data: Object.values(eventsByLocation.value)
  }]
}))

const speakersEventData = computed(() => ({
  labels: speakersByEventCount.value.map(s => s.name),
  datasets: [{
    label: 'Events per Speaker',
    backgroundColor: '#10b981',
    data: speakersByEventCount.value.map(s => s.events)
  }]
}))

// 📅 Events by Month (for Doughnut Chart)
const eventsByMonth = computed(() => {
  const monthMap = {}
  events.value.forEach(e => {
    const month = new Date(e.date).toLocaleString('default', { month: 'short', year: 'numeric' })
    monthMap[month] = (monthMap[month] || 0) + 1
  })
  return monthMap
})

const eventsByMonthData = computed(() => ({
  labels: Object.keys(eventsByMonth.value),
  datasets: [{
    label: 'Events per Month',
    backgroundColor: [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#22d3ee', '#14b8a6', '#f43f5e', '#eab308'
    ],
    data: Object.values(eventsByMonth.value)
  }]
}))


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: { beginAtZero: true }
  }
}
</script>

<style scoped>
/* Force height on canvas */
div :deep(canvas) {
  height: 300px !important;
}
</style>
