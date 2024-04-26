<!--
    1. Tag component
        目前没有做任何公共组件处理
-->

<script setup lang="ts"></script>

<template>
  <div
    class="text-[rgb(38,38,38)] bg-[rgb(255,193,7)] font-semibold border border-solid border-[rgb(255,193,7)] rounded-[50px] text-[11px] -tracking-[0.15px] py-[2px] px-3 inline-flex whitespace-nowrap"
  >
    <slot name="default" />
  </div>
</template>
