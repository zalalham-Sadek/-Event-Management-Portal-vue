import { createRouter,createWebHashHistory } from "vue-router";
import dashboard from "@/views/dashboard.vue";
import Events from "@/views/Events.vue";
import AddEvent from "@/views/AddEvent.vue";
const routes =[
    {path:'/',name:'dashboard',component:dashboard},
    {path:'/events',name:'Events',component:Events},
    {path:'/events/create',name:'Add Event',component:AddEvent},
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;