import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Inbox from '@/views/forms/Inbox.vue'
import Compose from '@/views/forms/Compose.vue'
import Viewticket from '@/views/forms/Viewticket.vue'
import Account from '@/views/forms/Account.vue'
import NotFound from '@/views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
  //THIS IS MAIN ROUTER

  {
    path : '/:catchall(.*)',
    name: 'NotFound',
    component: NotFound,
    props: true
  },
  
  { path: '/', 
    name: 'Login', 
    component: Login,
    props: true 
  },
  { path: '/Account', name: 'Account' ,component: Account},

  //THIS HOME ROUTER
  { path: '/Home', 
    name: 'Home', 
    component: Home,
    children:[
      { path: '/Inbox/:status', 
        name:'Inbox',
        component: Inbox, 
        props: true
      },
      { path: '/Compose',  
        component: Compose, 
      }, 
      { path: '/Viewticket/:id',   
        name:'Viewticket',
        component: Viewticket, 
        props: true
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
