<template>
    <table class="min-w-full text-sm text-left">
        <thead class="text-xs text-gray-700 uppercase">
            <tr class="border-b border-gray-300">
                <th class="px-4 sm:px-6">
                    <input type="checkbox" />
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
                    <input type="checkbox" />
                </td>

                <!-- Dynamically create TD based on colTitle -->
                <td v-for="(col, colIndex) in colTitle" :key="colIndex" class="px-4 py-4 sm:px-6 whitespace-nowrap">
                    <template v-if="col.toLowerCase() === 'action'">
                        <div class="relative inline-block text-left">
                            <button @click="toggleDropdown(index)"
                                class="inline-flex justify-center w-full px-3 py-1 text-sm font-medium text-gray-700 hover:cursor-pointer">
                                <i class="fas fa-ellipsis-v"></i>
                            </button>
                            <div v-if="openDropdown === index"
                                class="origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white focus:outline-none z-50">
                                <div class="py-1 text-sm text-gray-700">
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="editEvent(event)">
                                        <i class="fas fa-edit pr-3 text-xs"></i>Edit
                                    </a>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="deleteEvent(event)">
                                        <i class="fas fa-trash pr-3 text-xs"></i>Delete
                                    </a>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100" @click="viewEvent(event)">
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
</template>

<script>
export default {
    props: {
        colTitle: {
            type: Array,
            required: true,
        },
        paginatedEvents: Array,
    },
    data() {
        return {
            openDropdown: null,
        };
    },
    methods: {
        toggleDropdown(index) {
            this.openDropdown = this.openDropdown === index ? null : index;
        },
        editEvent(event) {
            console.log('Editing:', event);
        },
        deleteEvent(event) {
            console.log('Deleting:', event);
        },
        viewEvent(event) {
            console.log('Viewing:', event);
        },
    },
};
</script>
