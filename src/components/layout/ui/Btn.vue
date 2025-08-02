<template>

    <router-link :to="href"
        class="inline-flex items-center gap-2 px-5 py-1.5 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 shadow-sm transition">
        <i class="fas fa-plus"></i>
        <span>{{ btnTitle }}</span>
    </router-link>

</template>

<script>
export default {
    props: {
        btnTitle: String,
        href: String
    }
}
</script>