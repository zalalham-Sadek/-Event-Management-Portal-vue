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

        <!-- Users - Only visible to admin -->
        <ItemList v-if="userStore.isAdmin" label="Users" :sidebarCollapsed="sidebarCollapsed" href="/users">
            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill="currentColor"
                        d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2m4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-3.7 3.7c-.28.28-.44.66-.44 1.06V20h-2v-6.5c0-.66.26-1.28.7-1.74L15 9.5V16h3v6m-8-2v-6H9V9h2V7H7V5h4V3H5v2h2v2H5v2h2v6H8c-.55 0-1 .45-1 1v3h2v-3c0-.55.45-1 1-1h3z" />
                </svg>
            </span>
        </ItemList>

    </nav>
</template>


<script setup>
import ItemList from './ItemList.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

defineProps({
    sidebarCollapsed: Boolean,
});
</script>