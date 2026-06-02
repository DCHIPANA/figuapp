import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/inicio' },
      {
        path: 'inicio',
        name: 'inicio',
        component: () => import('pages/InicioPage.vue')
      },
      {
        path: 'album',
        name: 'album',
        component: () => import('pages/AlbumPage.vue')
      },
      {
        path: 'album/:sectionId',
        name: 'seccion',
        component: () => import('pages/SeccionPage.vue')
      },
      {
        path: 'intercambio',
        name: 'intercambio',
        component: () => import('pages/IntercambioPage.vue')
      }
    ]
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('pages/RegistroPage.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes