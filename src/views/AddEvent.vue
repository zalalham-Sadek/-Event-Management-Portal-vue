<template>
  <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

  <div class="p-6 max-w-7xl mx-auto bg-gray-50">
    <headPage part="Events" title="Add Event" :enableBtn="false" href="" />

    <div class="col-span-12 md:col-span-4">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative"
      >
        <form @submit.prevent="saveEvent">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <InputField v-model="newEvent.title" type="text" placeholder="Enter Event Title" />
              <p v-if="submitted && errors.title" class="text-red-500 text-xs pl-3">{{ errors.title }}</p>
            </div>
            <div>
              <InputField v-model="newEvent.type" type="text" placeholder="Enter Event Type" />
              <p v-if="submitted && errors.type" class="text-red-500 text-xs pl-3">{{ errors.type }}</p>
            </div>
            <div>
              <InputField v-model="newEvent.date" type="date" placeholder="Enter Event Date" />
              <p v-if="submitted && errors.date" class="text-red-500 text-xs pl-3">{{ errors.date }}</p>
            </div>
            <div>
              <InputField v-model="newEvent.audience" type="text" placeholder="Enter Audience" />
              <p v-if="submitted && errors.audience" class="text-red-500 text-xs pl-3">{{ errors.audience }}</p>
            </div>
            <div>
              <InputField v-model="newEvent.location" type="text" placeholder="Enter Location" />
              <p v-if="submitted && errors.location" class="text-red-500 text-xs pl-3">{{ errors.location }}</p>
            </div>
            <div>
              <input
                ref="tagInput"
                id="tags"
                class="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
                placeholder="choose Speakers"
                v-model="speakersString"
              />
              <p v-if="submitted && errors.speakers" class="text-red-500 text-xs mt-1">{{ errors.speakers }}</p>
              <p v-if="newEvent.date && tagSuggestions.length === 0" class="text-orange-500 text-xs mt-1">
                ⚠️ No speakers available for the selected date ({{ newEvent.date }})
              </p>
              <p v-if="newEvent.date && tagSuggestions.length > 0" class="text-green-500 text-xs mt-1">
                ✅ {{ tagSuggestions.length }} speaker(s) available for {{ newEvent.date }}
              </p>
              <div v-if="newEvent.date && availableSpeakersDetails.length > 0" class="mt-2 p-2 bg-gray-50 rounded-lg">
                <p class="text-xs text-gray-600 mb-1">Available speakers:</p>
                <div class="space-y-1">
                  <div v-for="speaker in availableSpeakersDetails" :key="speaker.id" class="text-xs">
                    <span class="font-medium">{{ speaker.name }}</span>
                    <span class="text-gray-500"> - {{ speaker.topics.join(', ') }}</span>
                  </div>
                </div>
              </div>
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

          <div class="pt-6">
            <button class="bg-primary text-white px-6 py-2 rounded-xl hover:bg-blue-700">
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

const errors = reactive({ title: "", type: "", date: "", audience: "", location: "", speakers: "" });
const tagInput = ref(null);
const tagify = ref(null);
const toastMessage = ref("");
const toastVisible = ref(false);
const submitted = ref(false);
const toastType = ref("success");

const newEvent = ref({ title: "", type: "", date: "", audience: "", location: "", speakers: [], tags: [] });
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
  const selectedSpeakers = newEvent.value.speakers || [];
  if (selectedSpeakers.length === 0) {
    errors.speakers = "choose at least one speaker";
  } else {
    const unavailable = selectedSpeakers.filter(name => !isSpeakerAvailable(name, newEvent.value.date));
    errors.speakers = unavailable.length > 0 ? `Not available on ${newEvent.value.date}: ${unavailable.join(", ")}` : "";
  }
  return Object.values(errors).every((e) => e === "");
}

const saveEvent = () => {
  submitted.value = true;
  if (!validate()) {
    showToast("⚠️ Please fill in all fields correctly", 3000, "error");
    return;
  }
  const storedEvents = localStorage.getItem("events");
  const events = storedEvents ? JSON.parse(storedEvents) : [];
  const nextId = events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1;

  const eventToSave = {
    id: nextId,
    ...newEvent.value,
    tags: newEvent.value.speakers || [],
  };

  if (hasScheduleConflict(eventToSave, events)) {
    showToast("❌ A conflict exists on the same date and location for another event.", 4000, "error");
    return;
  }

  events.push(eventToSave);
  localStorage.setItem("events", JSON.stringify(events));
  newEvent.value = { title: "", type: "", date: "", audience: "", location: "", speakers: [], tags: [] };
  if (tagify.value) tagify.value.removeAllTags();
  submitted.value = false;
  showToast("✅ Event saved successfully");
};

function hasScheduleConflict(newEvent, existingEvents) {
  return existingEvents.some((ev) => ev.date === newEvent.date && ev.location === newEvent.location);
}

function showToast(message, duration = 3000, type = "success") {
  toastMessage.value = message;
  toastVisible.value = true;
  toastType.value = type;
  setTimeout(() => (toastVisible.value = false), duration);
}
</script>
