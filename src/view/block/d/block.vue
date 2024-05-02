<script setup lang="ts">
import { s3DataType } from '@/components/data';
import s3Client from '@/services/s3Client';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
dayjs.extend(relativeTime);

const { params } = useRoute();
const bucketName = 'rustbucketethereum';
const blockId = params.id as string;
const record = ref<s3DataType['content'] | undefined>(undefined);

async function fetchs3Data() {
  const getObjectParams = { Bucket: bucketName, Key: blockId };
  const objectData = await s3Client.send(new GetObjectCommand(getObjectParams));
  const _data = await objectData?.Body?.transformToString();
  const jsonContent: s3DataType['content'] = JSON.parse(_data || ''); // Parse the raw data
  record.value = jsonContent;
}

onMounted(() => {
  fetchs3Data();
});
</script>

<template>
  <section class="container-xxl">
    <div
      class="flex border-0 border-b border-solid border-[#e9ecef] flex-wrap justify-between items-center py-[1.25rem] gap-[0.75rem]"
    >
      <div class="flex flex-col gap-[0.25rem]">
        <div class="flex flex-wrap items-center gap-[0.25rem]">
          <h1 class="text-xl font-bold mr-[0.25rem] mb-0">Block</h1>
          <div class="text-[#6c757d]">
            #{{ parseInt(record?.blockNumber!, 16) }}
          </div>
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
          Block Height:
        </div>
        <div class="col md:w-[75%]">
          {{ parseInt(record?.blockNumber!, 16) }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Timestamp:
        </div>
        <div class="col md:w-[75%]">
          {{ dayjs(Number(record?.timestamp) * 1000).fromNow() }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Transactions:
        </div>
        <div class="col md:w-[75%]">
          <a
            :href="`/transactions?bid=${record?.blockNumber}`"
            class="text-[rgb(7,132,195)]"
          >
            {{ record?.numberOfTransactions }} transactions in this block
          </a>
        </div>
      </div>
      <hr class="opacity-75 my-[1rem] mx-0" />
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Fee Recipient:
        </div>
        <div class="col md:w-[75%]">
          {{ record?.authorAddress }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Total Difficulty:
        </div>
        <div class="col md:w-[75%]">
          {{ parseInt(record?.difficulty!, 16).toLocaleString() }}
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Size:
        </div>
        <div class="col md:w-[75%]">
          {{ parseInt(record?.size!, 16).toLocaleString() }} bytes
        </div>
      </div>
      <hr class="opacity-75 my-[1rem] mx-0" />
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Gas Used:
        </div>
        <div class="col md:w-[75%]">
          {{ parseInt(record?.blockGasUsed!, 16).toLocaleString() }}
          <!-- <span class="text-[#6c757d]"> (45.44%)</span> -->
        </div>
      </div>
      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Gas Limit:
        </div>
        <div class="col md:w-[75%]">
          {{ parseInt(record?.gasLimit!, 16).toLocaleString() }}
        </div>
      </div>
      <hr class="opacity-75 my-[1rem] mx-0" />

      <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Hash:
        </div>
        <div class="col md:w-[75%]">
          {{ record?.blockHash }}
        </div>
      </div>
      <!-- <div class="row mb-[1rem]">
        <div
          class="flex-grow-0 flex-shrink-0 basis-auto w-auto md:w-[25%] md:text-[#6c757d] md:font-normal text-[#081d35] font-medium mb-[0.25rem] md:mb-0"
        >
          Parent Hash:
        </div>
        <div class="col md:w-[75%]">
          0xc16484104d2f59eaea1f208fb75e1c70e010c6215b96b41e1dc2fdf1532fa6a9
        </div>
      </div> -->
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
