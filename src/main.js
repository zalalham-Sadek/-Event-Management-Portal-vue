import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import Topbar from './components/layout/Topbar.vue'
import Sidebar from './components/layout/Sidebar.vue'
import router from './router'

const app = createApp(App)
app.component('Topbar',Topbar)
app.component('Sidebar',Sidebar)
app.use(router)

app.mount('#app')
