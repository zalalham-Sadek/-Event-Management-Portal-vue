<template>
  <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

  <div class="p-6 max-w-7xl mx-auto">
    <headPage part="Events" title="Add Event" :enableBtn="false" href="" />

    <div class="col-span-12 md:col-span-4">
      <div class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative">
        <form @submit.prevent="saveEvent">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <!-- Title -->
            <div>
              <InputField v-model="newEvent.title" type="text" placeholder="Enter Event Title" />
              <p v-if="submitted && errors.title" class="text-red-500 text-xs pl-3">{{ errors.title }}</p>
            </div>

            <!-- Type -->
            <div>
              <InputField v-model="newEvent.type" type="text" placeholder="Enter Event Type" />
              <p v-if="submitted && errors.type" class="text-red-500 text-xs pl-3">{{ errors.type }}</p>
            </div>

            <!-- Date -->
            <div>
              <InputField v-model="newEvent.date" type="datetime-local" placeholder="Enter Event Date" />
              <p v-if="submitted && errors.date" class="text-red-500 text-xs pl-3">{{ errors.date }}</p>
            </div>

            <!-- Audience -->
            <div>
              <InputField v-model="newEvent.audience" type="text" placeholder="Enter Audience" />
              <p v-if="submitted && errors.audience" class="text-red-500 text-xs pl-3">{{ errors.audience }}</p>
            </div>

            <!-- Location -->
            <div>
              <InputField v-model="newEvent.location" type="text" placeholder="Enter Location" />
              <p v-if="submitted && errors.location" class="text-red-500 text-xs pl-3">{{ errors.location }}</p>
            </div>

            <!-- Duration -->
            <div>
              <InputField v-model="newEvent.duration_minutes" type="number" placeholder="Duration in minutes" />
              <p v-if="submitted && errors.duration_minutes" class="text-red-500 text-xs pl-3">{{ errors.duration_minutes }}</p>
            </div>

            <!-- Description -->
            <div class="col-span-1 sm:col-span-2 lg:col-span-3">
              <textarea
                v-model="newEvent.description"
                rows="3"
                placeholder="Enter Event Description"
                class="appearance-none w-full px-4 py-2 text-sm rounded-xl border border-primary-border dark:border-gray-600 bg-background-secondary text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-border"
              ></textarea>
              <p v-if="submitted && errors.description" class="text-red-500 text-xs pl-3">{{ errors.description }}</p>
            </div>

            <!-- Speakers -->
            <div class="col-span-1 sm:col-span-2 lg:col-span-3">
              <input
                ref="tagInput"
                id="tags"
                class="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-primary-border dark:border-gray-600 bg-background-secondary text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-border"
                placeholder="Choose Speakers"
              />
              <p v-if="submitted && errors.speakers" class="text-red-500 text-xs mt-1">{{ errors.speakers }}</p>

              <p v-if="newEvent.date && tagSuggestions.length === 0" class="text-orange-500 text-xs mt-1">
                ⚠️ No speakers available for the selected date ({{ newEvent.date.split('T')[0] }})
              </p>
              <p v-if="newEvent.date && tagSuggestions.length > 0" class="text-green-500 text-xs mt-1">
                ✅ {{ tagSuggestions.length }} speaker(s) available for {{ newEvent.date.split('T')[0] }}
              </p>
            </div>
          </div>

          <div class="pt-6">
            <button
              class="bg-gradient-to-r from-background-primary to-background-primary/81 text-white hover:opacity-50 dark:outline-1 px-6 py-2 rounded-xl transition"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import ToastMessage from "@/components/layout/ui/ToastMessage.vue";
import services from "@/services";

const errors = reactive({
  title: "", type: "", date: "", audience: "", location: "", duration_minutes: "", description: "", speakers: ""
});

const tagInput = ref(null);
const tagify = ref(null);
const toastMessage = ref("");
const toastVisible = ref(false);
const submitted = ref(false);
const toastType = ref("success");

const newEvent = ref({
  title: "",
  type: "",
  date: "",
  audience: "",
  location: "",
  duration_minutes: "",
  description: "",
  speakers: [],
});

const speakersData = ref([]); // raw API data
const selectedSpeakerIds = ref([]); // store IDs to send to API

// Fetch speakers
const fetchSpeakers = async () => {
  try {
    const response = await services.SpeakerService.getAllSpeakers();
    speakersData.value = Array.isArray(response.data?.speakers) ? response.data.speakers : [];
  } catch (err) {
    speakersData.value = [];
    console.error(err);
  }
};

// Map available speakers for current date: {value: name, id: id}
const tagSuggestions = computed(() => {
  if (!newEvent.value.date) return [];
  const date = newEvent.value.date.split("T")[0];
  return speakersData.value
    .filter(s => s.availabe_date?.startsWith(date))
    .map(s => ({ value: s.name, id: s.id }));
});

onMounted(async () => {
  await fetchSpeakers();

  tagify.value = new Tagify(tagInput.value, {
    enforceWhitelist: true,
    whitelist: tagSuggestions.value,
    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(", "),
    dropdown: { enabled: 0, maxItems: 10, closeOnSelect: false },
  });

  tagify.value.on("add", e => {
    const tag = e.detail.data;
    if (!selectedSpeakerIds.value.includes(tag.id)) selectedSpeakerIds.value.push(tag.id);
  });

  tagify.value.on("remove", e => {
    const tag = e.detail.data;
    selectedSpeakerIds.value = selectedSpeakerIds.value.filter(id => id !== tag.id);
  });
});

// Update whitelist when date changes
watch(() => newEvent.value.date, (newDate) => {
  if (!tagify.value) return;
  tagify.value.removeAllTags();
  selectedSpeakerIds.value = [];
  const date = newDate?.split("T")[0];
  tagify.value.settings.whitelist = date
    ? speakersData.value.filter(s => s.availabe_date?.startsWith(date)).map(s => ({ value: s.name, id: s.id }))
    : [];
});

// Validate form
function validate() {
  errors.title = newEvent.value.title.trim() ? "" : "title is required";
  errors.type = newEvent.value.type.trim() ? "" : "event type is required";
  errors.date = newEvent.value.date.trim() ? "" : "date is required";
  errors.audience = newEvent.value.audience.trim() ? "" : "audience is required";
  errors.location = newEvent.value.location.trim() ? "" : "location is required";
  errors.duration_minutes = newEvent.value.duration_minutes ? "" : "duration is required";
  errors.description = newEvent.value.description.trim() ? "" : "description is required";
  errors.speakers = selectedSpeakerIds.value.length ? "" : "choose at least one speaker";

  return Object.values(errors).every(e => e === "");
}

// Save event
async function saveEvent() {
  submitted.value = true;
  if (!validate()) {
    showToast("⚠️ Please fill in all fields correctly", 3000, "error");
    return;
  }

  try {
    const payload = {
      title: newEvent.value.title,
      type: newEvent.value.type,
      event_date: newEvent.value.date,
      audience: newEvent.value.audience,
      location: newEvent.value.location,
      duration_minutes: newEvent.value.duration_minutes,
      description: newEvent.value.description,
      speakers: selectedSpeakerIds.value, // send IDs
    };

    const response = await services.EventService.createEvent(payload);
    showToast(response.data?.message || "✅ Event saved successfully");

    // Reset
    newEvent.value = { title: "", type: "", date: "", audience: "", location: "", duration_minutes: "", description: "", speakers: [] };
    selectedSpeakerIds.value = [];
    if (tagify.value) tagify.value.removeAllTags();
    submitted.value = false;
  } catch (err) {
    const message = err.response?.data?.error || "Failed to save event";
    showToast(`❌ ${message}`, 5000, "error");
    console.error(err);
  }
}

function showToast(message, duration = 3000, type = "success") {
  toastMessage.value = message;
  toastVisible.value = true;
  toastType.value = type;
  setTimeout(() => (toastVisible.value = false), duration);
}
</script>
