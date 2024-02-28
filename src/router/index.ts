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
        }, {
          path: 'data-table',
          component: () => import('@/views/table/DataTable.vue')
        }, {
          path: 'tree-table',
          component: () => import('@/views/table/TreeTable.vue')
        }]
    }, {
      path: '/403',
      component: () => import('@/views/error/Error403.vue')
    }, {
      path: '/404',
      component: () => import('@/views/error/Error404.vue')
    }, {
      path: '/500',
      component: () => import('@/views/error/Error500.vue')
    }
  ]
});

export default router;
