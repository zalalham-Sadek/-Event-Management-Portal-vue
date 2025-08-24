import { createRouter,createWebHashHistory } from "vue-router";
import dashboard from "@/views/dashboard.vue";
import Events from "@/views/Events.vue";
import AddEvent from "@/views/AddEvent.vue";
import Speakers from "@/views/Speakers.vue";
import Users from "@/views/Users.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Setup from "@/views/Setup.vue";
import Profile from "@/views/Profile.vue";
import services from "@/services";
import AddUser from "@/views/AddUser.vue";
const routes =[
    {path:'/',name:'dashboard',component:dashboard},
    {path:'/events',name:'Events',component:Events},
    {path:'/speakers',name:'speakers',component:Speakers},
    {path:'/users',name:'Users',component:Users},
    {path:'/users/create',name:'Add User',component:AddUser},
    {path:'/events/create',name:'Add Event',component:AddEvent},
    {path:'/login' , name:'login', component:Login},
    {path:'/register' , name:'register', component:Register},
    {path:'/setup' , name:'setup', component:Setup},
    {path:'/profile',name:'profile',component:Profile}
];

const router = createRouter({
    history:createWebHashHistory(),
    routes
});

// ✅ Navigation Guard
router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem('user') !== null

  // Allow access to setup, login and register pages
  if (to.path === '/setup' || to.path === '/login' || to.path === '/register') {
    // For setup page, check if admin already exists
    if (to.path === '/setup') {
      try {
        const response = await services.AuthService.checkSetup()
        const data = response.data
        if (data.hasAdmin) {
          // If admin exists, redirect to login
          next({ path: '/login' })
          return
        }
      } catch (err) {
        console.error('Setup check error:', err)
        // If it's a 409 conflict, it means admin exists
        if (err.response && err.response.status === 409) {
          next({ path: '/login' })
          return
        }
        // If check fails, allow access to setup
      }
    }
    next()
  } else if (!isAuthenticated) {
    // Check if setup is needed before redirecting to login
    try {
      const response = await services.AuthService.checkSetup()
      console.log('Setup check response:', response.data)
      const data = response.data
      if (!data.hasAdmin) {
        // If no admin exists, redirect to setup
        console.log('No admin found, redirecting to setup')
        next({ path: '/setup' })
        return
      } else {
        console.log('Admin exists, redirecting to login')
      }
    } catch (err) {
      console.error('Setup check error:', err)
      // If it's a 409 conflict, it means admin exists
      if (err.response && err.response.status === 409) {
        console.log('409 conflict - admin exists, redirecting to login')
        // Admin exists, continue to login redirect
      } else {
        // If check fails, assume no admin and redirect to setup
        console.log('Check failed, assuming no admin, redirecting to setup')
        next({ path: '/setup' })
        return
      }
    }
    // Only redirect to login if admin exists and user is not authenticated
    next({ path: '/login' })
  } else {
    next()
  }
})


export default router;