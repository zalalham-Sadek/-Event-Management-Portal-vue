<template>
    <div class="breadcrumb flex items-center justify-between border-b border-gray-300 dark:border-foreground pb-4 mb-6">
      <ul>
        <li class="border-r border-gray-400 inline pr-2 dark:text-gray-400">
          <a class="hover:text-gray-800" href="">{{part}}</a>
        </li>
        <li class="inline pl-2 text-gray-600 dark:text-gray-400">{{title}}</li>
      </ul>
      <div v-if="enableBtn">
        <Btn :btnTitle="btnTitle" :href="href"  />
        <!-- <button type="button" class="ti-btn ti-btn-primary label-ti-btn"> <i class="fas fa-add label-ti-btn-icon  me-2"></i> {{btnTitle}} </button> -->
        <!-- <button class="bg-primary text-primary-100 rounded px-4 py-1"></button> -->
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
        href:String

    }
}
</script>