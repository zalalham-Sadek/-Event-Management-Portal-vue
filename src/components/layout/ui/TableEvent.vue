<template>
    <div ref="tableWrapper" class="relative">
        <table class="min-w-full text-sm text-left">
            <thead class="text-xs text-secondary-text uppercase">
                <tr class="border-b border-primary-border">
                    <th class="px-4 sm:px-6">
                        # 
                       </th>
                    <th v-for="(col, index) in colTitle" :key="index" class="px-4 py-3 sm:px-6 relative">
                        <div class="absolute top-1/4 bottom-1/4 right-0 w-px bg-primary-border"></div>
                        {{ col }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(event, index) in paginatedEvents" :key="index"
                    class="border-b border-primary-border hover:bg-background-primary/30">
                    <td class="px-4 py-4 sm:px-6">
                        #
                    </td>

                    <td v-for="(col, colIndex) in colTitle" :key="colIndex" class="px-4 py-4 sm:px-6 whitespace-nowrap dark:text-secondary-text">
                        <template v-if="col.toLowerCase() === 'action'">
                            <div class="relative inline-block text-left">
                                <button @click.stop="toggleDropdown(index)"
                                    class="inline-flex justify-center w-full px-3 py-1 text-sm font-medium dark:text-secondary-text hover:cursor-pointer">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <div v-if="openDropdown === index"
                                    class="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-background-secondary z-50 focus:outline-none">
                                    <div class="py-1 text-sm text-gray-700 dark:text-secondary-text">
                                        <a href="#" class="block px-4 py-2 hover:bg-background-primary/30 " @click.prevent="editEvent(event)">
                                            <i class="fas fa-edit pr-3 text-xs"></i>Edit
                                        </a>
                                        <a href="#" class="block px-4 py-2 hover:bg-background-primary/30"
                                            @click.prevent="deleteEvent(event)">
                                            <i class="fas fa-trash pr-3 text-xs"></i>Delete
                                        </a>
                                        <a href="#" class="block px-4 py-2 hover:bg-background-primary/30"
                                            @click.prevent="viewEvent(event)">
                                            <i class="fas fa-eye pr-3 text-xs"></i>View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            {{ event[col.toLowerCase()] }}
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>

        <EventDetailModal :title="title" :visible="showModal" :event="selectedEvent" @close="closeModal"
            :allEvents="allEvents" />

        <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />
    </div>
</template>

<script>
import EventDetailModal from './Modal.vue';
import ToastMessage from './ToastMessage.vue';
import services from '@/services';

export default {
    props: {
        colTitle: Array,
        paginatedEvents: Array,
        title: String,
    },
    components: {
        EventDetailModal,
        ToastMessage,
    },
    data() {
        return {
            openDropdown: null,
            showModal: false,
            selectedEvent: null,
            toastMessage: '',
            toastVisible: false,
            toastType: 'success',
            allEvents: JSON.parse(localStorage.getItem('events')) || [],
        };
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        toggleDropdown(index) {
            this.openDropdown = this.openDropdown === index ? null : index;
        },
        handleClickOutside(event) {
            const wrapper = this.$refs.tableWrapper;
            if (wrapper && !wrapper.contains(event.target)) {
                this.openDropdown = null;
            }
        },
        editEvent(event) {
            console.log('Editing:', event);
              alert('Edition feature coming soon!')
        },
        // deleteEvent(event) {
        //     const key = this.title.toLowerCase(); // example: "events"
        //     const stored = localStorage.getItem(key);
        //     if (!stored) return;

        //     const items = JSON.parse(stored);
        //     const updatedItems = items.filter((e) => e.id !== event.id);
        //     localStorage.setItem(key, JSON.stringify(updatedItems));

        //     this.showToast(`${this.title.slice(0, -1)} deleted successfully`, 'success');

        //     setTimeout(() => {
        //         window.location.reload();
        //     }, 1000);
        // },
        
async deleteEvent(event) {
    try {
        const key = this.title.toLowerCase(); // example: "users", "events"
        
        if (!event.id) {
            this.showToast("Invalid item ID", "error");
            return;
        }

        // Dynamically call the service by table name
        const serviceName = `${key.charAt(0).toUpperCase() + key.slice(1)}Service`;
        if (services[serviceName] && typeof services[serviceName].delete === 'function') {
            await services[serviceName].delete(event.id);
        } else {
            this.showToast(`No service found for ${key}`, "error");
            return;
        }

        // Show toast
        const toastDuration = 3000; // 3 seconds
        this.showToast(`${this.title.slice(0, -1)} deleted successfully`, "success", toastDuration);

        // Refresh table after toast disappears
        setTimeout(() => {
            this.$emit("refreshData");
        }, toastDuration);

    } catch (err) {
        console.error("Delete error:", err);
        this.showToast("Failed to delete. Please try again.", "error");
    }
},
        
        viewEvent(event) {
            this.selectedEvent = event;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
            this.selectedEvent = null;
        },
        showToast(message, type = 'success', duration = 5000) {
            this.toastMessage = message;
            this.toastType = type;
            this.toastVisible = true;
            setTimeout(() => {
                this.toastVisible = false;
            }, duration);
        },
    },
};
</script>
