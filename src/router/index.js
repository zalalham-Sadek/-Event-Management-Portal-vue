import { createRouter,createWebHashHistory } from "vue-router";
import dashboard from "@/views/dashboard.vue";
import Events from "@/views/Events.vue";
import AddEvent from "@/views/AddEvent.vue";
import Speakers from "@/views/Speakers.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
const routes =[
    {path:'/',name:'dashboard',component:dashboard},
    {path:'/events',name:'Events',component:Events},
    {path:'/speakers',name:'speakers',component:Speakers},
    {path:'/events/create',name:'Add Event',component:AddEvent},
    {path:'/login' , name:'login', component:Login},
    {path:'/profile',name:'profile',component:Profile}
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});




export default router;