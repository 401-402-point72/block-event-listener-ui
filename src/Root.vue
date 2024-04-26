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
    <footer class="pb-12">
      <div
        class="w-full px-[15px] mx-auto sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] pt-12 sm:pt-0"
      >
        <div class="bg-[rgb(72,72,72)] h-[1px] mt-24 mb-6 w-full"></div>
        <div class="mt-1">
          <div class="flex justify-center">
            <small class="text-[rgb(136,136,136)] mr-[7px] text-center block">
              Copyright © 2024 - solanabeach.io
            </small>
            <div></div>
          </div>
        </div>
        <div class="mt-1">
          <div class="flex justify-center items-center">
            <div class="flex justify-center items-center flex-col sm:flex-row">
              <div class="flex items-center">
                <div class="flex flex-wrap justify-center items-center">
                  <a
                    href="#"
                    class="cursor-pointer text-xs text-[rgb(136,136,136)] my-0 mx-4 -tracking-[0.2px] hover:text-white hover:underline"
                    >Contact Us</a
                  >
                  <a
                    href="https://github.com/solana-beach/api"
                    target="_blank"
                    class="cursor-pointer text-xs text-[rgb(136,136,136)] my-0 mx-4 -tracking-[0.2px] hover:text-white hover:underline"
                    >API</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
.normal-content {
  background: url('/01.svg') right top / 50vmax no-repeat,
    url('/02.svg') left top / 50vmax;
  background-position: right top, left top;
}
</style>
