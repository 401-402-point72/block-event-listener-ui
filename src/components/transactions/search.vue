<script setup lang="ts">
import Search from '@/components/dashboard/search.vue';
</script>

<template>
  <div class="flex flex-row items-center mb-6 justify-between min-h-9">
    <h3 class="text-white text-2xl sm:mb-0" style="text-transform: capitalize">
      transactions
    </h3>
    <div
      class="sm:relative sm:top-[unset] sm:left-[unset] sm:right-[unset] sm:flex-[unset] sm:m-0 sm:ml-[50px] sm:w-[750px]"
    >
      <Search style="margin-bottom: 0" />
    </div>
  </div>
</template>
