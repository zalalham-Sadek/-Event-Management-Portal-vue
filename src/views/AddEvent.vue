<template>
<ToastMessage :message="toastMessage" :visible="toastVisible" :type="toastType" />




    <div class="p-6 max-w-7xl mx-auto bg-gray-50">
        <headPage part="Events" title="Add Event" :enableBtn="false" href="" />

        <div class="col-span-12 md:col-span-4">
            <div
                class="bg-background-secondary space-y-3 dark:bg-box-dark m-0 p-8 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative">

                <!-- form grid -->
                <form @submit.prevent="saveEvent">

                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <div>
                                <InputField v-model="newEvent.title" type="text" placeholder="Enter Event Title" />
                                <p v-if="submitted && errors.title" class="text-red-500 text-xs pl-3">{{ errors.title }}
                                </p>
                            </div>
                        </div>
                        <div>
                            <InputField v-model="newEvent.type" type="text" placeholder="Enter Event Type" />
                            <p v-if="submitted && errors.type" class="text-red-500 text-xs  pl-3">{{ errors.type }}</p>

                        </div>
                        <div>
                            <InputField v-model="newEvent.date" type="date" placeholder="Enter Event Date" />
                            <p v-if="submitted && errors.date" class="text-red-500 text-xs pl-3">{{ errors.date }}</p>

                        </div>
                        <div>
                            <InputField v-model="newEvent.audience" type="text" placeholder="Enter Audience" />
                            <p v-if="submitted && errors.audience" class="text-red-500 text-xs pl-3">{{ errors.audience
                            }}</p>

                        </div>
                        <div>
                            <InputField v-model="newEvent.location" type="text" placeholder="Enter Location" />
                            <p v-if="submitted && errors.location" class="text-red-500 text-xs pl-3">{{ errors.location
                            }}</p>

                        </div>

                        <!-- Speakers Multi-select -->


                        <!-- Tagify Input -->
                        <div>
                            <!-- <label for="tags" class="block mb-1 font-medium text-gray-700">Tags (Topics)</label> -->
                            <input ref="tagInput" id="tags"
                                class="appearance-none w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary"
                                placeholder="choose Speakers" v-model="newEvent.speakers" />
                            <p v-if="submitted && errors.speakers" class="text-red-500 text-xs mt-1">{{ errors.speakers
                            }}</p>

                        </div>
                    </div>

                    <!-- Save Button -->
                    <div class="pt-6">
                        <button  class="bg-primary text-white px-6 py-2 rounded-xl hover:bg-blue-700">
                            Save Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<!-- 
<script setup>

import { onMounted, ref } from 'vue'
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'

const tagInput = ref(null)
const tagify = ref(null)

const initialTags = ['css', 'html', 'javascript']
const tagSuggestions = ['Vue', 'React', 'Tailwind', 'TypeScript', 'Node.js']

onMounted(() => {
  tagify.value = new Tagify(tagInput.value, {
    whitelist: tagSuggestions,
    originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(', '),
    enforceWhitelist: false,
    dropdown: {
      maxItems: 10,
      enabled: 0, // show suggestions on focus
      closeOnSelect: false,
    },
  })

  // Optional: Set initial value
  tagify.value.addTags(initialTags)
})

// بيانات الحدث الجديد
const newEvent = ref({
  title: '',
  type: '',
  date: '',
  audience: '',
  location: '',
  speakers: [] // متعدد الاختيار
});

const speakerOptions = ref([
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Sarah Lee' },
  { id: 3, name: 'Ali Ahmed' },
  { id: 4, name: 'Mona Khaled' },
]);

// جلب الأحداث الحالية من localStorage أو التهيئة بمصفوفة
const loadEvents = () => {
  const stored = localStorage.getItem('events');
  return stored ? JSON.parse(stored) : [];
};
const saveEvent = () => {
  const events = loadEvents();
  const nextId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;

  const eventToSave = {
    id: nextId,
    title: newEvent.value.title,
    type: newEvent.value.type,
    date: newEvent.value.date,
    location: newEvent.value.location,
    audience: newEvent.value.audience,
    speakers: [] // يمكن تركه فارغًا الآن
  };

  // ✅ طباعة الحدث الجديد في وحدة التحكم
  console.log('New Event:', eventToSave);

  events.push(eventToSave);
  localStorage.setItem('events', JSON.stringify(events));

  // تفريغ النموذج بعد الحفظ
  newEvent.value = {
    title: '',
    type: '',
    date: '',
    audience: '',
    location: ''
  };

  alert('تم حفظ الحدث بنجاح');
};

</script> -->
<script setup>
import { ref, reactive, onMounted } from 'vue'
import Tagify from '@yaireo/tagify'
import '@yaireo/tagify/dist/tagify.css'

// Import speakers JSON data
import speakersData from '@/data/speakers.json' // adjust path as needed
import Events from '@/data/events.json' // adjust path as needed
import ToastMessage from '@/components/layout/ui/ToastMessage.vue'

// ... باقي الكود ...

const errors = reactive({
    title: '',
    type: '',
    date: '',
    audience: '',
    location: '',
    speakers: ''
})
const tagInput = ref(null)
const tagify = ref(null)
const toastMessage = ref('')
const toastVisible = ref(false)
const submitted = ref(false)
const toastType= ref('success') // or 'error'


// Extract speaker names for tagify whitelist
const tagSuggestions = speakersData.map(s => s.name)

// newEvent model
const newEvent = ref({
    title: '',
    type: '',
    date: '',
    audience: '',
    location: '',
    speakers: [],
    tags: []
})
const eventData = Events

const speakerOptions = ref(speakersData) // for your multi-select too

onMounted(() => {
    tagify.value = new Tagify(tagInput.value, {
        whitelist: tagSuggestions,
        originalInputValueFormat: valuesArr => valuesArr.map(item => item.value).join(', '),
        dropdown: {
            enabled: 0,
            maxItems: 10,
            closeOnSelect: false,
        },
    })
    // Removed initialTags setting here — Tagify starts empty
})
function validate() {
    // مسح الأخطاء السابقة
    errors.title = newEvent.value.title.trim() ? '' : 'title is required'
    errors.type = newEvent.value.type.trim() ? '' : '  event type is required'
    errors.date = newEvent.value.date.trim() ? '' : ' date is required '
    errors.audience = newEvent.value.audience.trim() ? '' : ' audience is required'
    errors.location = newEvent.value.location.trim() ? '' : 'location is required '
    const currentTags = tagify.value.getCleanValue()
    errors.speakers = currentTags.length > 0 ? '' : ' choose at least one speakers'

    return Object.values(errors).every(e => e === '')
}

const saveEvent = () => {
    submitted.value = true;

    if (!validate()) {
showToast('⚠️ Please fill in all fields correctly',3000, 'error');
        return
    }

    // باقي حفظ الحدث
    const storedEvents = localStorage.getItem('events');
    const events = storedEvents ? JSON.parse(storedEvents) : [];
    const nextId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    const currentTags = tagify.value.getCleanValue()

    const eventToSave = {
        id: nextId,
        title: newEvent.value.title,
        type: newEvent.value.type,
        date: newEvent.value.date,
        location: newEvent.value.location,
        audience: newEvent.value.audience,
        speakers: currentTags.map(tag => tag.value),
        tags: currentTags.map(tag => tag.value),
    };

    events.push(eventToSave);
    localStorage.setItem('events', JSON.stringify(events));

    newEvent.value = {
        title: '',
        type: '',
        date: '',
        audience: '',
        location: '',
        speakers: [],
        tags: []
    };
    tagify.value.removeAllTags();

    submitted.value = false;
showToast('✅ Event saved successfully');
}

function showToast(message, duration = 3000 ,type = 'success') {
    toastMessage.value = message
    toastVisible.value = true
    toastType.value =type
    setTimeout(() => {
        toastVisible.value = false
    }, duration)
}
</script>
