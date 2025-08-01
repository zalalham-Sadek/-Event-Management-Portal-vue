import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import Topbar from './components/layout/Topbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import Btn from './components/layout/ui/Btn.vue'
import HeadPage from './components/layout/ui/HeadPage.vue'
import InputField from './components/layout/ui/InputField.vue'
import { createPinia } from 'pinia'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
app.component('Topbar',Topbar)
app.component('Sidebar',Sidebar)
app.component('Btn',Btn)
app.component('HeadPage',HeadPage)
app.component('InputField',InputField)
app.use(pinia)
app.use(router)

app.mount('#app')
