<template>
  <div class="p-6 max-w-7xl mx-auto bg-gray-50">

        <headPage part="Speakers" title="overview" :enableBtn="false" href="" />

    <div class="col-span-12 md:col-span-6">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative">
        <div class="px-5 pt-2 ">
          <!-- <p class="text-xl inline dark:text-gray-400">Filters</p> -->
        </div>
        <SearchAndPerpage v-model:searchQuery="searchQuery" v-model:itemsPerPage="itemsPerPage" />
        <!-- Events Table -->
        <div class="max-w-full overflow-x-auto shadow-md rounded-xl">
          <TableSpeakers :colTitle="['name', 'bio','action']"
            :paginatedEvents="paginatedSpeakers" title="Speakers" />
          <!-- Pagination -->
          <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" :itemsPerPage="itemsPerPage"
            :totalItems="Speakers.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Speakers from '@/data/speakers.json';
import SearchAndPerpage from '@/components/layout/ui/SearchAndPerpage.vue';
import TableSpeakers from '@/components/layout/ui/TableEvent.vue';
import Pagination from '@/components/layout/ui/Pagination.vue';
import HeadPage from '@/components/layout/ui/HeadPage.vue';

export default {
  name: 'Speakers',
  data() {
    return {
      Speakers: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      openDropdown: null,

    };
  },
  created() {
  // Load events from localStorage or fallback to JSON file
  const savedSpeakers = localStorage.getItem('speakers');
  if (savedSpeakers) {
    this.Speakers = JSON.parse(savedSpeakers);
  } else {
    this.Speakers = Speakers;
    // Save default events to localStorage for future use
    localStorage.setItem('speakers', JSON.stringify(Speakers));
  }
},
  components: {
    SearchAndPerpage,  HeadPage, TableSpeakers, Pagination
  },
  computed: {
    // eventTypes() {
    //   return [...new Set(this.Speakers.map(e => e.type))];
    // },
    
    // eventLocations() {
    //   return [...new Set(this.events.map(e => e.location))];
    // },
    filteredSpeakers() {
      return this.Speakers
        .filter(speaker => {
          const q = this.searchQuery.toLowerCase();
          return (
            speaker.name.toLowerCase().includes(q) 
          );
        });
    },
    totalPages() {
        console.log("filtered speaker" + this.filteredSpeakers)
        return Math.ceil(this.filteredSpeakers.length / this.itemsPerPage);
    },
    paginatedSpeakers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      console.log( this.itemsPerPage);
      return this.filteredSpeakers.slice(start, end);
    }
  },
  watch: {
    // filters: {
    //   deep: true,
    //   handler() {
    //     this.currentPage = 1;
    //   }
    // },
    itemsPerPage(newVal) {
      console.log('speakers.vue: itemsPerPage changed to:', newVal);
      console.log('speakers.vue: filteredSpeakers length:', this.filteredSpeakers.length);
      console.log('speakers.vue: totalPages:', this.totalPages);
      this.currentPage = 1; // Reset page when items per page changes
    },
    paginatedSpeakers(newVal) {
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


//   deleteEvent(event) {
//     this.events = this.events.filter(e => e.id !== event.id);
//     this.updateLocalStorage();
//     console.log('Deleted event:', event);
//   },

  viewEvent(event) {
    console.log('View event:', event);
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
