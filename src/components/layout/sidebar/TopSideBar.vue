<template>
          <div v-if="!sidebarCollapsed" class="flex items-center justify-between gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-13" viewBox="0 0 256 146">
          <path fill="#99dbb1"
            d="m182.918 35.045l38.037 38.036l-37.61 37.611l-23.505-23.506l-17.523 17.521l23.506 23.506l17.522 17.523L256 73.081L238.477 55.56l-38.036-38.037z" />
          <path fill="#99dbb3"
            d="m72.655 0l-55.56 55.559l17.523 17.523l38.037-38.037l23.506 23.506l17.522-17.522l-23.506-23.506z" />
          <path fill="#008f32"
            d="M73.082 110.691L17.523 55.132L0 72.654l73.082 73.082l17.095-17.095l.428-.427L200.868 17.95L183.346.427z" />
        </svg>
        <span class="font-bold text-lg text-primary">zalalham</span>
      </div>
</template>

<script>
export default{
props :{
    sidebarCollapsed:Boolean
}
}
</script>