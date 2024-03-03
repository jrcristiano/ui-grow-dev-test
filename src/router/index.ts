/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ListStudents from '@/pages/students/ListStudents.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          children: [
            { path: '', component: ListStudents },
            { path: 'student/create', component: () => import('@/pages/students/CreateStudent.vue') },
            { path: 'student/:uuid/edit', component: () => import('@/pages/students/EditStudent.vue') },
          ]
        }
      ]
    }
  ]
})

export default router
