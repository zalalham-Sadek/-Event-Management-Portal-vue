<template>
  <ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />

  <div class="p-6 max-w-4xl mx-auto">
    <headPage part="Users" title="Add User" :enableBtn="false" href="" />
    <div class="col-span-12 md:col-span-6">
      <div
        class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative"
      >
        <form @submit.prevent="saveUser">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Name -->
            <div>
              <InputField v-model="newUser.name" type="text" placeholder="Enter Full Name" />
              <p v-if="submitted && errors.name" class="text-red-500 text-xs pl-3">{{ errors.name }}</p>
            </div>

            <!-- Email -->
            <div>
              <InputField v-model="newUser.email" type="email" placeholder="Enter Email" />
              <p v-if="submitted && errors.email" class="text-red-500 text-xs pl-3">{{ errors.email }}</p>
            </div>

            <!-- Role -->
            <div>
              <select
                v-model="newUser.role"
                class="appearance-none w-full px-4 py-2 text-sm rounded-xl border border-primary-border dark:border-gray-600 bg-background-secondary text-secondary-text focus:outline-none focus:ring-2 focus:ring-primary-border"
              >
                <option disabled value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <p v-if="submitted && errors.role" class="text-red-500 text-xs pl-3">{{ errors.role }}</p>
            </div>

            <!-- Password -->
            <div>
              <InputField v-model="newUser.password" type="password" placeholder="Enter Password" />
              <p v-if="submitted && errors.password" class="text-red-500 text-xs pl-3">{{ errors.password }}</p>
            </div>
          </div>

          <!-- Save Button -->
          <div class="pt-6">
            <button
              class="bg-gradient-to-r from-background-primary to-background-primary/81 text-white hover:opacity-50 px-6 py-2 rounded-xl transition"
            >
              Save User
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

const newUser = ref({
  name: "",
  email: "",
  role: "",
  password: "",
});

const errors = reactive({ name: "", email: "", role: "", password: "" });
const submitted = ref(false);
const toastMessage = ref("");
const toastVisible = ref(false);
const toastType = ref("success");

function validate() {
  errors.name = newUser.value.name.trim() ? "" : "Name is required";
  errors.email = newUser.value.email.trim() ? "" : "Email is required";
  errors.role = newUser.value.role ? "" : "Role is required";
  errors.password = newUser.value.password.trim() ? "" : "Password is required";

  return Object.values(errors).every((e) => e === "");
}

const saveUser = () => {
  submitted.value = true;
  if (!validate()) {
    showToast("⚠️ Please fill all fields correctly", 3000, "error");
    return;
  }

    // Call API to create user
    services.UserService.createUser(newUser.value)
    .then(() => {
      showToast("✅ User created successfully");
      newUser.value = { name: "", email: "", role: "", password: "" };
      submitted.value = false;
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      showToast("❌ Failed to create user. Please try again.", 5000, "error");
    });

  // Store in localStorage (simulate DB)
//   const storedUsers = localStorage.getItem("users");
//   const users = storedUsers ? JSON.parse(storedUsers) : [];
//   const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

//   const userToSave = { id: nextId, ...newUser.value };
//   users.push(userToSave);

//   localStorage.setItem("users", JSON.stringify(users));

  newUser.value = { name: "", email: "", role: "", password: "" };
  submitted.value = false;
  showToast("✅ User saved successfully");
};

function showToast(message, duration = 3000, type = "success") {
  toastMessage.value = message;
  toastVisible.value = true;
  toastType.value = type;
  setTimeout(() => (toastVisible.value = false), duration);
}
</script>
