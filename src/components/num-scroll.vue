<script setup lang="ts">
import {
  onUnmounted,
  watchPostEffect,
  toRefs,
  effectScope,
  computed,
  ref,
} from 'vue';
import clsx from 'clsx';
const scope = effectScope();
const props = defineProps({
  number: {
    type: String,
    required: true,
  },
  suffix: {
    type: String,
    default: '',
    required: false,
  },
});
const { number } = toRefs(props);
const refs = ref({});
const numStr = computed(() =>
  number.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
);
function updateNumber(str: string) {
  str = str.replace(/\D/g, '');
  const scrollWrap = Object.values(refs.value) as HTMLDivElement[];

  // 假设他们的size是一样的
  for (let index = 0; index < scrollWrap.length; index++) {
    const element = scrollWrap[index] as HTMLDivElement;
    // @ts-ignore
    const text = element.dataset.text as string;
    const newText = str[index];

    const top = -36 * parseInt(newText) + 14;
    element.style.top = `${top}px`;
  }
}
scope.run(() => {
  watchPostEffect(() => {
    updateNumber(number.value);
  });
});

onUnmounted(() => {
  scope.stop();
});
</script>

<template>
  <div class="flex">
    <template v-for="(num, index) in numStr">
      <p
        v-if="Object.is(parseInt(num), NaN)"
        :class="
          clsx(
            'leading-[unset] mb-0 text-4xl font-semibold -tracking-[0.3px] text-primary whitespace-nowrap',
            {
              'leading-[1.8]': num === '.',
            }
          )
        "
      >
        {{ num }}
      </p>

      <div v-else class="relative h-[60px] w-[24.44px] overflow-hidden ns-i">
        <div
          :data-text="num"
          :ref="
            (el) => {
              // @ts-ignore
              if (el) refs[index] = el;
            }
          "
          class="sc-kp absolute -top-[58px] transition-all duration-150"
          style="top: 0; transition: all 0.15s ease 0s"
        >
          <div
            v-for="item in Array.from({ length: 10 }, (_, i) => i)"
            class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-[24.44px] text-center leading-[1]"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </template>
    <small
      v-if="!!suffix"
      class="opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-[5px] leading-[1] mt-[14px]"
      >{{ suffix }}</small
    >
  </div>
</template>

<style lang="scss">
.ns-i {
  &::before {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    pointer-events: none;
    background-image: linear-gradient(
      to top,
      rgba(49, 49, 49, 0),
      rgb(255 255 255) 90%
    );
    width: 100%;
    height: 24px;
  }
  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    bottom: 0px;
    left: 0px;
    pointer-events: none;
    background-image: linear-gradient(
      rgba(49, 49, 49, 0),
      rgb(255 255 255) 100%
    );
    width: 100%;
    height: 24px;
  }
}
</style>
