<!--
    1. Copyed text component
-->

<script setup lang="ts">
import { useSlots, toRefs } from 'vue';
import { TextProps } from './data';
const props = defineProps<TextProps>();
const { copyed } = toRefs(props);

const slots = useSlots();

function copyText(text: string) {
  if (typeof text === 'string') {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
}

function handlerCopy(e: MouseEvent) {
  e.stopPropagation();
  const text = slots.default?.()[0].children as string;
  if (typeof text === 'string') {
    copyText(text);
  } else if (typeof copyed.value === 'object') {
    const text = copyed.value.text || '';
    copyText(text);
  }
}
</script>

<template>
  <div class="flex items-center">
    <div
      v-if="!!copyed"
      @click="handlerCopy"
      class="flex items-center cursor-pointer opacity-50 hover:opacity-100"
    >
      <i class="iconfont" style="font-size: 14px">&#xe6f5;</i>
    </div>
    <div class="flex items-center whitespace-nowrap ml-2">
      <slot name="default" />
    </div>
  </div>
</template>
