import { createRouter,createWebHashHistory } from "vue-router";
import dashboard from "@/views/dashboard.vue";
import Events from "@/views/Events.vue";
const routes =[
    {path:'/',name:'dashboard',component:dashboard},
    {path:'/events',name:'Events',component:Events}
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

export default router;