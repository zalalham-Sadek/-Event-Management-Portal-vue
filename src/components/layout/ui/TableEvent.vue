<template>
    <div ref="tableWrapper" class="relative">
        <table class="min-w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase">
                <tr class="border-b border-gray-300">
                    <th class="px-4 sm:px-6">
                        # 
                       </th>
                    <th v-for="(col, index) in colTitle" :key="index" class="px-4 py-3 sm:px-6 relative">
                        <div class="absolute top-1/4 bottom-1/4 right-0 w-px bg-gray-200"></div>
                        {{ col }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(event, index) in paginatedEvents" :key="index"
                    class="border-b border-gray-300 hover:bg-gray-50">
                    <td class="px-4 py-4 sm:px-6">
                        #
                    </td>

                    <td v-for="(col, colIndex) in colTitle" :key="colIndex" class="px-4 py-4 sm:px-6 whitespace-nowrap">
                        <template v-if="col.toLowerCase() === 'action'">
                            <div class="relative inline-block text-left">
                                <button @click.stop="toggleDropdown(index)"
                                    class="inline-flex justify-center w-full px-3 py-1 text-sm font-medium text-gray-700 hover:cursor-pointer">
                                    <i class="fas fa-ellipsis-v"></i>
                                </button>
                                <div v-if="openDropdown === index"
                                    class="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white z-50 focus:outline-none">
                                    <div class="py-1 text-sm text-gray-700">
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click.prevent="editEvent(event)">
                                            <i class="fas fa-edit pr-3 text-xs"></i>Edit
                                        </a>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100"
                                            @click.prevent="deleteEvent(event)">
                                            <i class="fas fa-trash pr-3 text-xs"></i>Delete
                                        </a>
                                        <a href="#" class="block px-4 py-2 hover:bg-gray-100"
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
        deleteEvent(event) {
            const key = this.title.toLowerCase(); // example: "events"
            const stored = localStorage.getItem(key);
            if (!stored) return;

            const items = JSON.parse(stored);
            const updatedItems = items.filter((e) => e.id !== event.id);
            localStorage.setItem(key, JSON.stringify(updatedItems));

            this.showToast(`${this.title.slice(0, -1)} deleted successfully`, 'success');

            setTimeout(() => {
                window.location.reload();
            }, 1000);
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
