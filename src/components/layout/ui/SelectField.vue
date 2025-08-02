<template>
  <div class="relative w-full flex items-center">
    <span class="absolute right-3 text-gray-400 pointer-events-none">
      <i :class="icon"></i>
    </span>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="appearance-none w-full pr-10 pl-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
    >
  <option value="">All {{ label }}</option> <!-- ← Add this -->
      <option v-for="item in data" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    label: String,
    data: {
      type: Array,
      required: true
    },
    modelValue: String
  },
  emits: ['update:modelValue']
}
</script>
