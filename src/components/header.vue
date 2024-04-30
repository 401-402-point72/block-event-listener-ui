<script setup lang="ts"></script>

<template>
  <header
    class="text-base font-normal text-left box-border flex items-center bg-white border-0 border-b border-solid border-gray-300 h-[60px] mb-[50px] fixed left-0 right-0 top-0 z-50 pr-6 pl-6"
  >
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="lg:flex hidden lg:flex-1">
          <div class="lg:flex hidden lg:flex-1">
            <RouterLink to="/" class="lg:w-[230px] inline-flex">
              <img src="/logo.png" class="w-[44px]" />
            </RouterLink>
          </div>
        </div>
        <div class="lg:hidden flex lg:flex-1">
          <RouterLink to="/">
            <img src="/logo.png" class="w-[44px]" />
          </RouterLink>
        </div>
        <div class="lg:hidden flex items-center">33</div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 576px) {
  .container,
  .container-sm {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container,
  .container-md,
  .container-sm {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 1140px;
  }
}
</style>
