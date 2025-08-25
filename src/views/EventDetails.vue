<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
        <headPage part="Events" title="Event Details" :enableBtn="false" href="" />

    <!-- Event Card -->
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        {{ event.title }}
      </h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
        <p><span class="font-semibold"> Date:</span> {{ event.event_date }}</p>
        <p><span class="font-semibold"> type:</span> {{ event.type }}</p>
        <p><span class="font-semibold"> Location:</span> {{ event.location }}</p>
        <p><span class="font-semibold"> Audience:</span> {{ event.audience }}</p>
      </div>
    </div>

    <!-- Speakers Table -->
    <div class="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
         Speakers
      </h2>

      <table v-if="speakers.length" class="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-sm">
          <tr>
            <th class="px-4 py-3 text-left">#</th>
            <th class="px-4 py-3 text-left">Name</th>
            <th class="px-4 py-3 text-left">Bio</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(speaker, index) in speakers"
            :key="speaker.id"
            class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
              {{ speaker.name }}
            </td>
            <td class="px-4 py-3 text-gray-700 dark:text-gray-300">
              {{ speaker.bio }}
            </td>
          </tr>
        </tbody>
      </table>

      <p v-else class="text-gray-500 dark:text-gray-400 italic">
        No speakers assigned.
      </p>
    </div>
  </div>
</template>

<script>
import services from "@/services";

export default {
  data() {
    return {
      event: {},
      speakers: []
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const response = await services.EventService.EventDetails(id);

    this.event = response.data.event;
    this.speakers = response.data.speakers;
  }
};
</script>
