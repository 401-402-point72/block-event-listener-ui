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
      {
        path: 'blocks',
        name: 'blocks',
        component: () => import('../view/block/block.vue'),
      },
      {
        path: 'block/:id',
        name: 'block',
        component: () => import('../view/block/d/block.vue'),
      },
      {
        path: 'transaction/:id',
        name: 'transaction',
        component: () => import('../view/transactions/d/transaction.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});
export default router;
