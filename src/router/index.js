import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Climbing from '../views/Climbing.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/climbing',
    name: 'Climbing',
    component: Climbing
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    // will match everything
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
