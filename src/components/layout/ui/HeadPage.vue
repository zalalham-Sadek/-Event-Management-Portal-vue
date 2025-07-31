<template>
    <div class="breadcrumb flex items-center justify-between border-b border-gray-300 dark:border-foreground pb-4 mb-6">
      <ul>
        <li class="border-r border-gray-400 inline pr-2 dark:text-gray-400">
          <a class="hover:text-gray-800" href="">{{part}}</a>
        </li>
        <li class="inline pl-2 text-gray-600 dark:text-gray-400">{{title}}</li>
      </ul>
      <div v-if="enableBtn">
        <button class="bg-primary text-primary-100 rounded px-4 py-1">{{btnTitle}}</button>
      </div>
    </div>
</template>

<script>
export default{
    props:{
        part:String,
        title:String,
        enableBtn:Boolean,
        btnTitle:String,

    }
}
</script>