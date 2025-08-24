<template>
  <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

  <div class="p-6 max-w-5xl mx-auto">
    <headPage part="Speakers" title="Add Speaker" :enableBtn="false" />

    <div class="col-span-12 md:col-span-6">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative"
      >
        <form @submit.prevent="saveSpeaker">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <InputField v-model="newSpeaker.name" type="text" placeholder="Enter Speaker Name" />
              <p v-if="submitted && errors.name" class="text-red-500 text-xs pl-3">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <InputField v-model="newSpeaker.email" type="email" placeholder="Enter Email" />
              <p v-if="submitted && errors.email" class="text-red-500 text-xs pl-3">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div>
              <InputField v-model="newSpeaker.phone" type="text" placeholder="Enter Phone Number" />
              <p v-if="submitted && errors.phone" class="text-red-500 text-xs pl-3">{{ errors.phone }}</p>
            </div>

            <!-- Available Date -->
            <div>
              <InputField v-model="newSpeaker.availabe_date" type="datetime-local" />
              <p v-if="submitted && errors.availabe_date" class="text-red-500 text-xs pl-3">{{ errors.availabe_date }}</p>
            </div>

            <!-- Bio -->
            <div class="col-span-1 sm:col-span-2">
              <textarea
                v-model="newSpeaker.bio"
                rows="4"
                placeholder="Enter Speaker Bio"
                class="appearance-none w-full px-4 py-2 text-sm rounded-xl border border-primary-border dark:border-gray-600 bg-background-secondary text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-border"
              ></textarea>
              <p v-if="submitted && errors.bio" class="text-red-500 text-xs pl-3">{{ errors.bio }}</p>
            </div>
          </div>

          <!-- Submit -->
          <div class="pt-6">
            <button
              class="bg-gradient-to-r from-background-primary to-background-primary/81 text-white hover:opacity-50 px-6 py-2 rounded-xl transition"
            >
              Save Speaker
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import ToastMessage from "@/components/layout/ui/ToastMessage.vue";
import HeadPage from "@/components/layout/ui/HeadPage.vue";
import InputField from "@/components/layout/ui/InputField.vue";
import services from "@/services";

const errors = reactive({ name: "", email: "", phone: "", bio: "", availabe_date: "" });
const toastMessage = ref("");
const toastVisible = ref(false);
const toastType = ref("success");
const submitted = ref(false);

const newSpeaker = ref({
  name: "",
  email: "",
  phone: "",
  bio: "",
  availabe_date: ""
});

function validate() {
  errors.name = newSpeaker.value.name.trim() ? "" : "Name is required";
  errors.email = newSpeaker.value.email.trim() ? "" : "Email is required";
  errors.phone = newSpeaker.value.phone.trim() ? "" : "Phone is required";
  errors.bio = newSpeaker.value.bio.trim() ? "" : "Bio is required";
  errors.availabe_date = newSpeaker.value.availabe_date ? "" : "Available date is required";

  return Object.values(errors).every((e) => e === "");
}

async function saveSpeaker() {
  submitted.value = true;
  if (!validate()) {
    showToast("⚠️ Please fill all required fields", 3000, "error");
    return;
  }

  try {
    console.log("Saving speaker:", newSpeaker.value);
    await services.SpeakerService.createSpeaker(newSpeaker.value);

    // Reset
    newSpeaker.value = { name: "", email: "", phone: "", bio: "", availabe_date: "" };
    submitted.value = false;
    showToast("✅ Speaker saved successfully");
  } catch (err) {
    console.error("Error saving speaker:", err);
    showToast("❌ Failed to save speaker", 4000, "error");
  }
}

function showToast(message, duration = 3000, type = "success") {
  toastMessage.value = message;
  toastVisible.value = true;
  toastType.value = type;
  setTimeout(() => (toastVisible.value = false), duration);
}
</script>
