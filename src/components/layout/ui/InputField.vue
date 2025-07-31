<template>
  <div class="relative flex items-center w-full max-w-xs">
    <span class="absolute left-3 text-gray-400 pointer-events-none" v-if="icon">
      <i :class="icon"></i>
    </span>
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
    />
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
    icon: String, // optional icon
    type: {
      type: String,
      default: 'text' // 'date' or 'text'
    },
    placeholder: String
  },
  emits: ['update:modelValue']
}
</script>
