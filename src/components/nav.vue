<script setup lang="ts">
import { navConfig } from './config';
import clsx from 'clsx';
</script>

<template>
  <div
    class="fixed left-0 right-0 top-[60px] bg-[#081d35] hidden lg:block lg:z-20"
  >
    <div class="container">
      <div class="flex justify-between">
        <div v-for="item in navConfig" class="relative py-2 px-[17px]">
          <RouterLink
            :to="item.path"
            class="text-white bg-none rounded-lg border-none text-base mx-0 my-[10px] select-none"
          >
            <span
              :class="
                clsx('relative', {
                  'nav-item-active': item.path === $route.path,
                })
              "
            >
              {{ item.title }}
            </span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nav-item-active {
  &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 3px;
    border-radius: 1px;
    bottom: -4px;
    left: 50%;
    transform: translateX(-50%);
    background-image: linear-gradient(
      90deg,
      rgb(63, 162, 249) 0%,
      rgb(0, 255, 163) 100%
    );
  }
}
</style>
