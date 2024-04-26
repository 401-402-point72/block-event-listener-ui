import { defineAsyncComponent } from 'vue';

export const tabConfig = [
  {
    title: 'Price',
    key: 'price',
    component: defineAsyncComponent(() => import('./tabs/price.vue')),
  },
  {
    title: 'Volume',
    key: 'volume',
    component: defineAsyncComponent(() => import('./tabs/volume.vue')),
  },
];
