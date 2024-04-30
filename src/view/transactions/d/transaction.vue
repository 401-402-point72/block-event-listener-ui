<script setup lang="ts">
import { useRoute } from 'vue-router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { transfromTXDataType } from '@/components/data';

dayjs.extend(relativeTime);

const { params } = useRoute();

function blockClick(item: transfromTXDataType) {
  window.localStorage.setItem('blockItem', JSON.stringify(item.blockInfo));
}

const record = JSON.parse(
  window.localStorage.getItem('transactionItem')! || '{}'
);
</script>

<template>
  <section class="container-xxl">
    <div
      class="flex border-0 border-b border-solid border-[#e9ecef] flex-wrap justify-between items-center py-[1.25rem] gap-[0.75rem]"
    >
      <div class="flex flex-col gap-[0.25rem]">
        <div class="flex flex-wrap items-center gap-[0.25rem]">
          <h1 class="text-xl font-bold mr-[0.25rem] mb-0">
            Transaction Details
          </h1>
        </div>
      </div>
    </div>
  </section>

  <div>
    <div class="card p-[1.25rem] mb-[0.75rem]">
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium"
        >
          Transaction Hash:
        </div>
        <div class="col md:w-[75%]">
          {{ params.id }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Block:
        </div>
        <div class="col md:w-[75%]">
          <a
            :href="`/block/${record.blockNumber}`"
            class="text-[rgb(7,132,195)]"
            @click="blockClick(record)"
            >{{ record.blockNumber }}</a
          >
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Timestamp:
        </div>
        <div class="col md:w-[75%]">
          {{ dayjs(record.timestamp).fromNow() }}
        </div>
      </div>
      <hr class="opacity-75 my-[1rem] mx-0" />
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          From:
        </div>
        <div class="col md:w-[75%]">
          {{ record.from }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          To:
        </div>
        <div class="col md:w-[75%]">
          {{ record.to }}
        </div>
      </div>

      <hr class="opacity-75 my-[1rem] mx-0" />
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Value:
        </div>
        <div class="col md:w-[75%]">
          {{ record.ethValue }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container-xxl {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-right: auto;
  margin-left: auto;
}
@media (min-width: 1400px) {
  .container-xxl {
    max-width: 1400px;
  }
}
@media (min-width: 768px) {
  .container-xxl {
    --bs-gutter-x: 2.5rem;
  }
}
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #e9ecef;
  border-radius: 0.75rem;
}
.row {
  display: flex;
  flex-wrap: wrap;
  margin-top: -0.5rem;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
}
.row > * {
  max-width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
  margin-top: 0.5rem;
}
.col-auto {
  flex: 0 0 auto;
  width: auto;
}
.col {
  flex: 1;
}
.text-dt {
  color: #081d35;
  font-weight: 500;
}
hr {
  color: #e9ecef;
}
</style>
