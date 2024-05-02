<script setup lang="ts">
import NumScroll from '../num-scroll.vue';
import Tooltip from '../tooltip.vue';
import { _Object } from '@aws-sdk/client-s3';

defineProps({
  number: {
    type: String,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div>
    <div
      class="flex flex-col min-w-0 border-none bg-gray-100 overflow-visible relative py-[15px] px-[30px] sm:py-[30px] sm:px-[60px] sm:rounded-[20px]"
      style="
        background-clip: border-box;
        word-wrap: break-word;
        box-shadow: rgb(0 0 0 / 10%) 0px 15px 30px 0px;
      "
    >
      <div
        class="flex flex-col justify-between relative text-white lg:flex-row"
      >
        <div class="flex flex-col justify-between md:flex-row">
          <div class="md:self-center mb-4 lg:mb-0">
            <div class="flex items-start w-full justify-center flex-col">
              <small
                class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] block pb-0 relative"
                >Block Number</small
              >
              <NumScroll :number="number" />
            </div>
          </div>
          <div class="hidden lg:flex flex-col">
            <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
          </div>
          <div class="mb-4 lg:mb-0">
            <Tooltip
              context="This is the amount of time that it took the leading validator to successfully ingest transactions and to produce a slot."
            >
              Current Block Time
            </Tooltip>
            <NumScroll :number="time" suffix="S" />
          </div>
        </div>
        <div class="hidden lg:flex flex-col">
          <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
        </div>
        <div class="flex-grow">
          <div class="p-0">
            <Tooltip
              context="This is the amount of time that it took the leading validator to successfully ingest transactions and to produce a slot."
            >
              Epoch
            </Tooltip>
            <div class="flex items-center">
              <p
                class="text-4xl text-primary -tracking-[0.6px] mb-0 font-bold leading-none"
              >
                {{ Math.floor(Number(number) / 32) }}
              </p>
              <div
                class="leading-[0] text-xs bg-[rgb(38,38,38)] rounded-[20px] h-[0.8rem] flex items-center flex-1 my-0 mx-[5px] relative overflow-visible py-[5px] px-[3px]"
              >
                <div
                  class="flex flex-col justify-center overflow-hidden text-white text-center whitespace-nowrap bg-primary h-2 rounded-[30px]"
                  :style="`transition: width 0.6s ease; width: ${progress}%`"
                ></div>
              </div>
              <p
                class="text-4xl text-[rgb(38,38,38)] -tracking-[0.6px] mb-0 font-bold leading-none"
              >
                <!-- {{ count }} -->
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
