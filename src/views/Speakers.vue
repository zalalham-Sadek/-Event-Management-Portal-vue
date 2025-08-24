<template>
  <div class="p-6 max-w-7xl mx-auto ">

        <headPage part="Speakers" title="overview" :enableBtn="true" btnTitle="Add Speaker" href="/speakers/create" />

    <div class="col-span-12 md:col-span-6">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative">
        <div class="px-5 pt-2 ">
          <!-- <p class="text-xl inline dark:text-gray-400">Filters</p> -->
        </div>
        <SearchAndPerpage v-model:searchQuery="searchQuery" v-model:itemsPerPage="itemsPerPage" />
        <!-- Events Table -->
        <div class="max-w-full overflow-x-auto shadow-md rounded-xl">
          <TableSpeakers :colTitle="['name','email' , 'bio','availabe_date','action']"
            :paginatedEvents="paginatedSpeakers" title="Speaker" />
          <!-- Pagination -->
          <Pagination v-model:currentPage="currentPage" :totalPages="totalPages" :itemsPerPage="itemsPerPage"
            :totalItems="Speakers.length" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/services';
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
      loading: false,
      error: null,
    };
  },
  created() {
    this.loadSpeakers();
  },
  components: {
    SearchAndPerpage,
    HeadPage,
    TableSpeakers,
    Pagination,
  },
  computed: {
    filteredSpeakers() {
      return this.Speakers.filter((speaker) => {
        const q = this.searchQuery.toLowerCase();
        return speaker.name.toLowerCase().includes(q);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredSpeakers.length / this.itemsPerPage);
    },
    paginatedSpeakers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredSpeakers.slice(start, end);
    },
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },
  },
  methods: {
    async loadSpeakers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await service.SpeakerService.getAllSpeakers();
        this.Speakers = response.data.speakers; // adjust based on your API response structure
      } catch (err) {
        console.error('Failed to load speakers:', err);
        this.error = 'Failed to load speakers.';
      } finally {
        this.loading = false;
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    viewEvent(event) {
      console.log('View event:', event);
    },
  },
};
</script>


<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
</style>
