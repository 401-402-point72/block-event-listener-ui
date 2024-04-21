<script setup lang="ts">
import { ref } from 'vue';
import { tabConfig } from './config.ts';
import clsx from 'clsx';
const activeKey = ref('price');
</script>

<template>
  <div class="flex">
    <button
      v-for="tab in tabConfig"
      :key="tab.key"
      :class="
        clsx(
          'bg-none border-none font-bold mr-[10px] mb-[5px] text-[rgb(105,245,225)] ',
          {
            'text-[rgb(136,136,136)]': activeKey !== tab.key,
          }
        )
      "
      @click="activeKey = tab.key"
    >
      {{ tab.title }}
    </button>
  </div>
  <div>
    <component :is="tabConfig.find((o) => o.key === activeKey)?.component" />
  </div>
</template>
