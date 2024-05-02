<script setup lang="ts">
import Search from '../dashboard/search.vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const enterCb = (v: string) => {
  router.replace({
    name: route.name!,
    query: {
      ...route.query,
      q: v,
    },
  });
};
</script>

<template>
  <div
    class="flex flex-row items-center mb-6 justify-between min-h-9 border-0 border-b border-solid border-gray-300 pb-3"
  >
    <h3
      class="text-[#262626] text-2xl sm:mb-0"
      style="text-transform: capitalize"
    >
      Blocks
    </h3>
    <div
      class="sm:relative sm:top-[unset] sm:left-[unset] sm:right-[unset] sm:flex-[unset] sm:m-0 sm:ml-[50px] sm:w-[750px]"
    >
      <Search
        style="margin-bottom: 0"
        @enterCb="enterCb"
        placeholder="Search Block"
      />
    </div>
  </div>
</template>
