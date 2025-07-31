<template>
            <router-link :to="href" class="bg-primary flex justify-between items-center px-4 py-1.5 rounded-lg text-primary-100">
            <i class="fas fa-add pr-3 "></i> <span>{{btnTitle}} </span>
        </router-link>
</template>

<script>
export default {
    props:{
        btnTitle:String,
        href:String
    }
}
</script>