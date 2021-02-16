import Vue from 'vue'
import VueRouter from 'vue-router'
import Restaurant from '../views/Restaurant.vue'
import Staff from '../views/Staff.vue'
import Menu from '../views/Menu.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Restaurant',
    component: Restaurant
  },
  {
    path: '/staff',
    name: 'Staff',
    component: Staff
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
