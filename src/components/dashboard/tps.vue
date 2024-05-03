<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="my-6 flex flex-col min-w-0 bg-clip-border border-none bg-gray-100 relative py-[15px] px-[30px] sm:py-[30px] sm:px-[60px] sm:rounded-[20px] overflow-visible"
    style="box-shadow: rgb(0 0 0 / 20%) 0px 15px 30px 0px"
  >
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col justify-center sm:flex-row lg:flex-col">
        <div>
          <div class="flex items-center w-full justify-between">
            <div>
              <small
                class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >24-Hour High</small
              >
              <p
                class="leading-none mb-0 font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto text-2xl sm:text-4xl"
              >
                <span>{{
                  data.ethereum?.high_24h
                    ? data.ethereum?.high_24h.toFixed(2)
                    : 'N/A'
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
      </div>
      <div class="flex flex-col justify-center sm:flex-row lg:flex-col">
        <div>
          <div class="flex items-center w-full justify-between">
            <div>
              <small
                class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >24-Hour Low</small
              >
              <p
                class="leading-none mb-0 font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto text-2xl sm:text-4xl"
              >
                <span>{{
                  data.ethereum?.low_24h
                    ? data.ethereum?.low_24h.toFixed(2)
                    : 'N/A'
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
      </div>
      <div class="flex flex-col justify-center sm:flex-row lg:flex-col">
        <div>
          <div class="flex items-center w-full justify-between">
            <div>
              <small
                class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >All-Time High</small
              >
              <p
                class="leading-none mb-0 font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto text-2xl sm:text-4xl"
              >
                <span>{{
                  data.ethereum?.ath ? data.ethereum?.ath.toFixed(2) : 'N/A'
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="h-full w-[1px] bg-gray-200 my-0 mx-[45px] flex-1"></div>
      </div>
      <div class="flex flex-col justify-center sm:flex-row lg:flex-col">
        <div>
          <div class="flex items-center w-full justify-between">
            <div>
              <small
                class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                >All-Time Low</small
              >
              <p
                class="leading-none mb-0 font-semibold -tracking-[0.3px] text-primary whitespace-nowrap w-auto text-2xl sm:text-4xl"
              >
                <span>{{
                  data.ethereum?.atl ? data.ethereum?.atl.toFixed(2) : 'N/A'
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.amcharts-chart-div a {
  display: none !important;
}
</style>
