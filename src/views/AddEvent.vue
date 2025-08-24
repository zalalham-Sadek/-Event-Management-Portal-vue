<template>
  <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

  <div class="p-6 max-w-7xl mx-auto">
    <headPage part="Events" title="Add Event" :enableBtn="false" href="" />
    <div class="col-span-12 md:col-span-4">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative"
      >
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
              <InputField v-model="newEvent.date" type="date" placeholder="Enter Event Date" />
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
                v-model="speakersString"
              />
              <p v-if="submitted && errors.speakers" class="text-red-500 text-xs mt-1">{{ errors.speakers }}</p>

              <!-- Speakers availability messages -->
              <p v-if="newEvent.date && tagSuggestions.length === 0" class="text-orange-500 text-xs mt-1">
                ⚠️ No speakers available for the selected date ({{ newEvent.date }})
              </p>
              <p v-if="newEvent.date && tagSuggestions.length > 0" class="text-green-500 text-xs mt-1">
                ✅ {{ tagSuggestions.length }} speaker(s) available for {{ newEvent.date }}
              </p>

              <!-- List of available speakers -->
              <div v-if="newEvent.date && availableSpeakersDetails.length > 0" class="mt-2 p-2 bg-gray-50 rounded-lg">
                <p class="text-xs text-gray-600 mb-1">Available speakers:</p>
                <div class="space-y-1">
                  <div v-for="speaker in availableSpeakersDetails" :key="speaker.id" class="text-xs">
                    <span class="font-medium">{{ speaker.name }}</span>
                    <span class="text-gray-500"> - {{ speaker.topics.join(', ') }}</span>
                  </div>
                </div>
              </div>

              <!-- List of selected speakers -->
              <div v-if="newEvent.speakers && newEvent.speakers.length > 0" class="mt-2 p-2 bg-blue-50 rounded-lg">
                <p class="text-xs text-blue-600 mb-1">Selected speakers:</p>
                <div class="space-y-1">
                  <div v-for="speaker in newEvent.speakers" :key="speaker" class="text-xs text-blue-700">
                    ✅ {{ speaker }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
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
import { ref, reactive, onMounted, watch, computed } from "vue";
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
  tags: []
});

const speakersString = ref("");
const speakersData = ref([]);

onMounted(() => {
  const storedSpeakers = localStorage.getItem("speakers");
  speakersData.value = storedSpeakers ? JSON.parse(storedSpeakers) : [];

  tagify.value = new Tagify(tagInput.value, {
    whitelist: tagSuggestions.value,
    originalInputValueFormat: (valuesArr) => valuesArr.map((item) => item.value).join(", "),
    enforceWhitelist: true,
    dropdown: { enabled: 0, maxItems: 10, closeOnSelect: false },
  });

  tagify.value.on("add", () => {
    const tags = tagify.value.getCleanValue().map((tag) => tag.value);
    speakersString.value = tags.join(", ");
  });

  tagify.value.on("remove", () => {
    const tags = tagify.value.getCleanValue().map((tag) => tag.value);
    speakersString.value = tags.join(", ");
  });
});

watch(speakersString, (val) => {
  newEvent.value.speakers = val.split(",").map((v) => v.trim()).filter((v) => v.length > 0);
}, { immediate: true });

watch(() => newEvent.value.speakers, (val) => {
  const joined = val.join(", ");
  if (joined !== speakersString.value) {
    speakersString.value = joined;
  }
}, { deep: true });

const isSpeakerAvailable = (speakerName, date) => {
  const speaker = speakersData.value.find((s) => s.name === speakerName);
  return speaker && speaker.availableDates.includes(date);
};

const tagSuggestions = computed(() => {
  if (!newEvent.value.date) return [];
  return speakersData.value.filter((speaker) => speaker.availableDates.includes(newEvent.value.date)).map((s) => s.name);
});

const availableSpeakersDetails = computed(() => {
  if (!newEvent.value.date) return [];
  return speakersData.value.filter((speaker) => speaker.availableDates.includes(newEvent.value.date));
});

watch(() => newEvent.value.date, (newDate) => {
  if (!tagify.value) return;
  tagify.value.removeAllTags();
  newEvent.value.speakers = [];
  speakersString.value = "";

  if (newDate) {
    const filtered = speakersData.value.filter((s) => s.availableDates.includes(newDate)).map((s) => s.name);
    tagify.value.settings.whitelist = filtered;
    tagify.value.dropdown.show.call(tagify.value);
  } else {
    tagify.value.settings.whitelist = [];
  }
});

function validate() {
  errors.title = newEvent.value.title.trim() ? "" : "title is required";
  errors.type = newEvent.value.type.trim() ? "" : "event type is required";
  errors.date = newEvent.value.date.trim() ? "" : "date is required";
  errors.audience = newEvent.value.audience.trim() ? "" : "audience is required";
  errors.location = newEvent.value.location.trim() ? "" : "location is required";
  errors.duration_minutes = newEvent.value.duration_minutes ? "" : "duration is required";
  errors.description = newEvent.value.description.trim() ? "" : "description is required";

  const selectedSpeakers = newEvent.value.speakers || [];
  if (selectedSpeakers.length === 0) {
    errors.speakers = "choose at least one speaker";
  } else {
    const unavailable = selectedSpeakers.filter((name) => !isSpeakerAvailable(name, newEvent.value.date));
    errors.speakers =
      unavailable.length > 0 ? `Not available on ${newEvent.value.date}: ${unavailable.join(", ")}` : "";
  }

  return Object.values(errors).every((e) => e === "");
}

const saveEvent = async () => {
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
      speakers: newEvent.value.speakers,
    };

    await services.EventService.createEvent(payload);

    // Reset form
    newEvent.value = { title: "", type: "", date: "", audience: "", location: "", duration_minutes: "", description: "", speakers: [], tags: [] };
    if (tagify.value) tagify.value.removeAllTags();
    submitted.value = false;
    showToast("✅ Event saved successfully");
  } catch (error) {
    console.error("Error saving event:", error);
    showToast("❌ Failed to save event", 4000, "error");
  }
};

function showToast(message, duration = 3000, type = "success") {
  toastMessage.value = message;
  toastVisible.value = true;
  toastType.value = type;
  setTimeout(() => (toastVisible.value = false), duration);
}
</script>
