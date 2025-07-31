<template>
  <div class="p-6 max-w-7xl mx-auto bg-gray-50">

    <headPage part="Events" title="overview" :enableBtn="true" btnTitle="Add Event" />

    <div class="col-span-12 md:col-span-6">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative">
        <div class="px-5 pt-2 ">
          <p class="text-xl inline dark:text-gray-400">Filters</p>
        </div>
        <FilterPanel v-model:filters="filters" :eventTypes="eventTypes" :eventLocations="eventLocations" />
        <SearchAndPerpage v-model:searchQuery="searchQuery" v-model:itemsPerPage="itemsPerPage" />
        <!-- Events Table -->
        <div class="max-w-full overflow-x-auto shadow-md rounded-xl">
          <TableEvent :colTitle="['Title', 'Location', 'Date', 'Audience', 'Action']"
            :paginatedEvents="paginatedEvents"  />
          <!-- Pagination -->
          <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" :itemsPerPage="itemsPerPage"
            :totalItems="filteredEvents.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import eventData from '@/data/events.json';
import SearchAndPerpage from '@/components/layout/ui/SearchAndPerpage.vue';
import SelectField from '@/components/layout/ui/SelectField.vue';
import InputField from '@/components/layout/ui/InputField.vue';
import FilterPanel from '@/components/layout/ui/FilterPanel.vue';
import HeadPage from '@/components/layout/ui/HeadPage.vue';
import TableEvent from '@/components/layout/ui/TableEvent.vue';
import Pagination from '@/components/layout/ui/Pagination.vue';
export default {
  name: 'EventsOverview',
  data() {
    return {
      events: eventData,
      filters: {
        type: '',
        location: '',
        date: ''
      },
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 5,
      openDropdown: null,

    };
  },
  components: {
    SearchAndPerpage,
    SelectField, InputField, FilterPanel, HeadPage, TableEvent, Pagination
  },
  computed: {
    eventTypes() {
      return [...new Set(this.events.map(e => e.type))];
    },
    
    eventLocations() {
      return [...new Set(this.events.map(e => e.location))];
    },
    filteredEvents() {
      return this.events
        .filter(event => {
          return (
            (!this.filters.type || event.type === this.filters.type) &&
            (!this.filters.location || event.location === this.filters.location) &&
            (!this.filters.date || event.date === this.filters.date)
          );
        })
        .filter(event => {
          const q = this.searchQuery.toLowerCase();
          return (
            event.title.toLowerCase().includes(q) ||
            event.location.toLowerCase().includes(q) ||
            event.audience.toLowerCase().includes(q)
          );
        });
    },
    totalPages() {
      return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
    },
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log( this.itemsPerPage);
      return this.filteredEvents.slice(start, end);
    }
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.currentPage = 1;
      }
    },
    itemsPerPage(newVal) {
      console.log('Events.vue: itemsPerPage changed to:', newVal);
      console.log('Events.vue: filteredEvents length:', this.filteredEvents.length);
      console.log('Events.vue: totalPages:', this.totalPages);
      this.currentPage = 1; // Reset page when items per page changes
    },
    paginatedEvents(newVal) {
      console.log('Events.vue: paginatedEvents changed, length:', newVal.length);
    }
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    toggleDropdown(index) {
      this.openDropdown = this.openDropdown === index ? null : index;
    },
    editEvent(event) {
      // Your edit logic here
      console.log('Edit', event);
    },
    deleteEvent(event) {
      // Your delete logic here
      console.log('Delete', event);
    },
    viewEvent(event) {
      // Your view logic here
      console.log('View', event);
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
