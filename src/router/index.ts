import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/IndexLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue')
        }, {
          path: 'ordinary-table',
          component: () => import('@/views/table/OrdinaryTable.vue')
        }]
    }
  ]
});

export default router;
