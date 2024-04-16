<script setup lang="ts"></script>

<template>
  <div
    class="my-6 flex flex-col min-w-0 bg-clip-border text-[rgb(211,211,211)] border-none bg-[rgb(49,49,49)] rounded-lg py-[15px] px-[30px] overflow-hidden relative sm:py-[30px] sm:px-[60px] sm:rounded-[20px]"
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
                  class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-[rgb(105,245,225)] whitespace-nowrap w-auto"
                >
                  <small
                    class="opacity-30 text-4xl text-[rgb(105,245,225)] -tracking-[0.6px] font-light ml-0 mr-[5px]"
                    >◎</small
                  >
                  <span>446.6</span>
                  <small
                    style="text-transform: uppercase"
                    class="leading-none opacity-30 text-4xl text-[rgb(105,245,225)] -tracking-[0.6px] font-light ml-[5px]"
                  >
                    m
                  </small>
                </p>
              </div>
            </div>
          </div>
          <small class="text-[rgb(136,136,136)] text-[13px] -tracking-[0.2px]">
            of
            <span style="text-transform: uppercase">574.0m</span>
            :
            <span class="text-[rgb(105,245,225)] font-semibold ml-1 mr-1">
              <span>77.8%</span>
            </span>
          </small>
        </div>
        <div class="mb-4 lg:mb-0">
          <div>
            <div class="flex items-center w-full justify-between">
              <div>
                <small
                  class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >
                  Active Stake
                </small>
                <p
                  class="mb-0 text-4xl font-semibold -tracking-[0.3px] text-[rgb(105,245,225)] whitespace-nowrap w-auto"
                >
                  <small
                    class="opacity-30 text-4xl text-[rgb(105,245,225)] -tracking-[0.6px] font-light ml-0 mr-[5px]"
                    >◎</small
                  >
                  <span>378.5</span>
                  <small
                    style="text-transform: uppercase"
                    class="leading-none opacity-30 text-4xl text-[rgb(105,245,225)] -tracking-[0.6px] font-light ml-[5px]"
                  >
                    m
                  </small>
                </p>
              </div>
            </div>
          </div>
          <small class="text-[rgb(136,136,136)] text-[13px] -tracking-[0.2px]">
            of
            <span style="text-transform: uppercase">574.0m</span>
            :
            <span class="text-[rgb(105,245,225)] font-semibold ml-1 mr-1">
              <span>65.9%</span>
            </span>
          </small>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="h-full w-[1px] bg-[rgba(29,29,29,0.5)] my-0 mx-[45px] flex-1"
        ></div>
      </div>
      <div>2</div>
    </div>
  </div>
</template>
