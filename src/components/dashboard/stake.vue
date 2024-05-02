<script setup lang="ts">
import clsx from 'clsx';
import StakeTab from './stake-tab/stake-tab.vue';
import { convertUsdToMillion } from '@/utils/utils';
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
console.log(props);
</script>

<template>
  <div
    class="my-6 flex flex-col min-w-0 bg-clip-border border-none bg-gray-100 rounded-lg py-[15px] px-[30px] overflow-hidden relative sm:py-[30px] sm:px-[60px] sm:rounded-[20px]"
    style="box-shadow: rgb(0 0 0 / 20%) 0px 15px 30px 0px"
  >
    <div class="flex flex-col md:flex-row">
      <div class="flex flex-col justify-between self-stretch">
        <div class="mb-4 lg:mb-0">
          <div>
            <div class="flex items-center w-full justify-between">
              <div>
                <small
                  class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >
                  Circulating Supply
                </small>
                <p
                  class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto"
                >
                  <small
                    class="opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-0 mr-[5px]"
                    >◎</small
                  >
                  <span>{{
                    convertUsdToMillion(
                      data.ethereum?.circulating_supply
                    )?.toFixed(2)
                  }}</span>
                  <small
                    style="text-transform: uppercase"
                    class="leading-none opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-[5px]"
                  >
                    M
                  </small>
                </p>
              </div>
            </div>
          </div>
          <small class="text-[rgb(136,136,136)] text-[13px] -tracking-[0.2px]">
            of
            <span style="text-transform: uppercase"
              >{{
                convertUsdToMillion(data.ethereum?.total_supply)?.toFixed(2)
              }}m</span
            >
            :
            <span class="text-primary font-semibold ml-1 mr-1">
              <span>
                {{
                  (data.ethereum?.total_supply /
                    data.ethereum?.circulating_supply) *
                  100
                }}%</span
              >
            </span>
          </small>
        </div>
        <!-- <div class="mb-4 lg:mb-0">
          <div>
            <div class="flex items-center w-full justify-between">
              <div>
                <small
                  class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >
                  Total Supply
                </small>
                <p
                  class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto"
                >
                  <small
                    class="opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-0 mr-[5px]"
                    >◎</small
                  >
                  <span>{{
                    convertUsdToMillion(data.ethereum?.total_supply)?.toFixed(2)
                  }}</span>
                  <small
                    style="text-transform: uppercase"
                    class="leading-none opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-[5px]"
                  >
                    M
                  </small>
                </p>
              </div>
            </div>
          </div> -->
        <!-- <small class="text-[rgb(136,136,136)] text-[13px] -tracking-[0.2px]">
            of
            <span style="text-transform: uppercase">574.0m</span>
            :
            <span class="text-primary font-semibold ml-1 mr-1">
              <span>65.9%</span>
            </span>
          </small> -->
        <!-- </div> -->
      </div>
      <div class="flex flex-col">
        <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
      </div>
      <div class="flex flex-col flex-grow">
        <div class="flex sm:hidden flex-row flex-wrap justify-between">
          <div
            class="flex sm:hidden flex-col justify-between sm:flex-row mb-4 lg:mb-0"
          >
            <div class="text-primary flex items-center">
              <i class="iconfont font-black">&#xe615;</i>
              <span>0.1%</span>
            </div>
          </div>
          <div class="flex flex-col items-end">
            <div class="flex items-center w-full">
              <small
                class="text-[rgb(136,136,136)] text-sm -tracking-[0.4px]"
                style="text-transform: uppercase"
                >24h Volume:</small
              >
              <p
                class="mb-0 text-2xl -tracking-[0.4px] ml-[10px] text-primary"
                style="text-transform: uppercase"
              >
                3.3b
              </p>
            </div>
            <div class="flex justify-start items-center w-full">
              <small
                class="text-[rgb(136,136,136)] text-sm -tracking-[0.4px]"
                style="text-transform: uppercase"
                >MARKET CAP (fully diluted):</small
              >
              <p
                class="mb-0 text-2xl -tracking-[0.4px] ml-[10px] text-primary"
                style="text-transform: uppercase"
              >
                0.0
              </p>
            </div>
          </div>
        </div>
        <div class="hidden sm:flex">
          <div class="flex justify-between items-center mb-4 w-full lg:mb-0">
            <div class="flex items-center">
              <div>
                <div class="flex items-center w-full justify-between">
                  <div>
                    <p
                      class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto"
                    >
                      <small
                        class="opacity-30 text-4xl text-primary -tracking-[0.6px] font-light ml-0 mr-[5px]"
                        >$</small
                      >
                      <span>{{
                        data.ethereum?.current_price
                          ? data.ethereum?.current_price?.toFixed(2)
                          : 'N/A'
                      }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div
                :class="
                  clsx('ml-1 md:ml-4 flex items-center', {
                    'text-[#1afa29]':
                      data.ethereum?.price_change_percentage_24h.toFixed(2) > 0,
                    'text-[red]':
                      data.ethereum?.price_change_percentage_24h.toFixed(2) < 0,
                  })
                "
              >
                <i
                  class="iconfont font-black text-[#1afa29]"
                  v-if="
                    data.ethereum?.price_change_percentage_24h.toFixed(2) > 0
                  "
                  >&#xe615;</i
                >
                <i class="iconfont font-black text-[red]" v-else>&#xe618;</i>
                <span>
                  {{
                    data.ethereum?.price_change_percentage_24h.toFixed(2)
                  }}%</span
                >
              </div>
            </div>
            <div class="flex flex-col items-end">
              <div class="flex justify-end items-center w-full">
                <small class="text-[rgb(136,136,136)] text-sm -tracking-[0.4px]"
                  >24h Volume:</small
                >
                <p
                  class="mb-0 text-2xl -tracking-[0.4px] ml-[10px] text-primary"
                  style="text-transform: uppercase"
                >
                  {{
                    convertUsdToMillion(data.ethereum?.total_volume)?.toFixed(2)
                  }}
                </p>
              </div>
              <div class="flex justify-end items-center w-full">
                <small class="text-[rgb(136,136,136)] text-sm -tracking-[0.4px]"
                  >Market Cap in USD</small
                >
                <p
                  class="mb-0 text-2xl -tracking-[0.4px] ml-[10px] text-primary"
                  style="text-transform: uppercase"
                >
                  {{
                    convertUsdToMillion(data.ethereum?.market_cap)?.toFixed(2)
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <StakeTab />
      </div>
    </div>
  </div>
</template>
