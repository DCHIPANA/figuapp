import { defineRouter } from '#q-app/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import { LocalStorage } from 'quasar'
import routes from './routes'

export default defineRouter(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to) => {
    const user = LocalStorage.getItem('figus_user')

    if (to.meta.requiresAuth && !user) {
      return { name: 'registro' }
    }

    if (to.name === 'registro' && user) {
      return { name: 'inicio' }
    }

    return true
  })

  return Router
})