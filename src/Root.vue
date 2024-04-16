<script setup lang="ts">
import Header from '@/components/header.vue';
import Nav from '@/components/nav.vue';
</script>

<template>
  <Header />
  <Nav />
  <div class="relative z-10 pt-[120px] normal-content">
    <div class="container">
      <div class="flex flex-wrap -mr-[15px] -ml-[15px]">
        <div
          class="relative w-full px-[15px] flex-grow-0 flex-shrink-0 basis-full max-w-full"
        >
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.normal-content {
  background: url('/01.svg') right top / 50vmax no-repeat,
    url('/02.svg') left top / 50vmax;
  background-position: right top, left top;
}
</style>
