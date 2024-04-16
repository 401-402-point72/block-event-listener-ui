import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routers: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'app',
    component: () => import('../Root.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../view/dashboard/dashboard.vue'),
      },
      {
        path: 'transactions',
        name: 'transactions',
        component: () => import('../view/transactions/transactions.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});
export default router;
