<template>
    <nav class="mt-4 space-y-5 text-white px-8 py-4">
        <ItemList label="Dashboard" :sidebarCollapsed="sidebarCollapsed" href="/">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
                    <path fill="currentColor"
                        d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
                </svg>
            </span>
            <!-- <span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span> -->
        </ItemList>
        <ItemList label="Events" :sidebarCollapsed="sidebarCollapsed" href="/events">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
                    <path fill="currentColor"
                        d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
                </svg>
            </span>
            <!-- <span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span> -->
        </ItemList>
        <ItemList label="Speakers" :sidebarCollapsed="sidebarCollapsed" href="/speakers">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a1 1 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13m9-8.586l6 6V15l.001 5H6v-9.586z" />
                    <path fill="currentColor"
                        d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31c-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18" />
                </svg>
            </span>
            <!-- <span v-if="!sidebarCollapsed" class="text-[18px] ">Dashboard</span> -->
        </ItemList>




    </nav>
</template>


<script>
import ItemList from './ItemList.vue';

export default {
    props: {
        sidebarCollapsed: Boolean,
    },
    components:{
        ItemList
    }

}
</script>