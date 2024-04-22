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
        path: 's3-test', // New route for S3 test
        name: 'S3ConnectionTest',
        component: () => import('../view/S3Test/S3ConnectionPage.vue'), // Path to your S3 test page
      },
      {
        path: 'coin-gecko', // New route for S3 test
        name: 'CoinGeckoTest',
        component: () => import('../view/coingecko/coinTestPage.vue'), // Path to your S3 test page
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
});
export default router;
