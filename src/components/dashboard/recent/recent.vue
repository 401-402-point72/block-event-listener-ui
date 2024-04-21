<script setup lang="ts">
import RecentSlots from './child/slots.vue';
import RecentTransactions from './child/transactions.vue';
</script>

<template>
  <div class="my-6 flex flex-wrap -mx-[15px]">
    <div
      class="relative w-full px-[15px] flex-grow-0 flex-shrink-0 basis-full max-w-full lg:basis-1/2 lg:max-w-[50%]"
    >
      <RecentSlots />
    </div>
    <div
      class="relative w-full px-[15px] flex-grow-0 flex-shrink-0 basis-full max-w-full lg:basis-1/2 lg:max-w-[50%] mt-4 lg:mt-0"
    >
      <RecentTransactions />
    </div>
  </div>
</template>
