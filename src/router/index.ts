import { createRouter, createWebHistory } from 'vue-router';
import { useTokenStore } from '@/stores/token';


const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/IndexLayout.vue'),
      meta: { isAuth: true },
      children: [
        {
          path: '',
          component: () => import('@/views/HomeView.vue'),
          meta: { isAuth: true }
        }, {
          path: 'ordinary-table',
          component: () => import('@/views/table/OrdinaryTable.vue'),
          meta: { isAuth: true }
        }, {
          path: 'data-table',
          component: () => import('@/views/table/DataTable.vue'),
          meta: { isAuth: true }
        }, {
          path: 'tree-table',
          component: () => import('@/views/table/TreeTable.vue'),
          meta: { isAuth: true }
        }, {
          path: '/403',
          component: () => import('@/views/error/Error403.vue'),
          meta: { isAuth: true }
        }, {
          path: '/404',
          component: () => import('@/views/error/Error404.vue'),
          meta: { isAuth: true }
        }, {
          path: '/500',
          component: () => import('@/views/error/Error500.vue'),
          meta: { isAuth: true }
        }]
    }, {
      path: '/login',
      component: () => import('@/layouts/login/LoginLayout.vue'),
      meta: { isAuth: false },
      children: [{
        path: '',
        component: () => import('@/views/login/LoginView.vue'),
        meta: { isAuth: false }
      }]
    }
  ]
});
router.beforeEach((to) => {
  const tokenStore = useTokenStore();
  if (!to.meta.isAuth) {
    return true;
  } else if (!tokenStore.isAuth) {
    return { path: '/login' };
  } else {
    return true;
  }
});

export default router;
