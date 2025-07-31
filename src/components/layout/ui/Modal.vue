<template>
  <transition name="modal-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 sm:px-0"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg sm:max-w-xl p-4 sm:p-6 relative"
      >
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-2">
          <h1 class="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Event Details:</h1>
          <button
            @click="closeModal"
            class="text-2xl text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            &times;
          </button>
        </div>

        <!-- Modal content -->
        <div class="mt-4 space-y-2 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
          <p><strong class="inline-block w-24">Title:</strong> {{ event?.title }}</p>
          <p><strong class="inline-block w-24">Type:</strong> {{ event?.type }}</p>
          <p><strong class="inline-block w-24">Date:</strong> {{ event?.date }}</p>
          <p><strong class="inline-block w-24">Audience:</strong> {{ event?.audience }}</p>
          <p><strong class="inline-block w-24">Location:</strong> {{ event?.location }}</p>
          <p><strong class="inline-block w-24">Speakers:</strong> {{ event?.speakers?.join(', ') }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EventDetailModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
.fixed.inset-0.bg-black.bg-opacity-50 {
    backdrop-filter: blur(4px);
    /* subtle blur behind modal */
}

.fixed.inset-0.bg-black {
    background-color: rgba(143, 141, 141, 0.164);
}
</style>
