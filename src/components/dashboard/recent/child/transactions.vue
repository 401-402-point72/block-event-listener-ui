<script setup lang="ts">
import s3Client from '@/services/s3Client.ts';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  _Object,
} from '@aws-sdk/client-s3';
import { reactive, onMounted } from 'vue';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { transactionType } from './data';
import { transfromTXDataType } from '@/components/data';

dayjs.extend(relativeTime);
const bucketName = 'rustbucketethereum';
const s3Objects = reactive<_Object[]>([]);
const fullData = reactive<transfromTXDataType[]>([]);

function transactionClick(item: transfromTXDataType) {
  window.localStorage.setItem('transactionItem', JSON.stringify(item));
}

async function fetchS3Objects() {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );
    s3Objects.push(...(response.Contents || []));
  } catch (error) {
    console.error(`Error connecting to S3: ${error}`);
  }
}

async function s3DataAsJson() {
  if (s3Objects.length === 0) {
    await fetchS3Objects();
  }

  const object = s3Objects[s3Objects.length - 1];
  const getObjectParams = { Bucket: bucketName, Key: object.Key };
  const objectData = await s3Client.send(new GetObjectCommand(getObjectParams));
  // Read object data and convert to a readable JSON format
  const data = await objectData?.Body?.transformToString();
  const jsonContent = JSON.parse(data || ''); // Parse the raw data
  const transactions: transactionType[] = jsonContent.transactions;

  for (const transaction of transactions) {
    if (fullData.length < 6) {
      fullData.push({
        ...transaction,
        blockNumber: jsonContent.blockNumber,
        timestamp: jsonContent.timestamp,
        blockInfo: jsonContent,
      });
    } else {
      break;
    }
  }
}

onMounted(() => {
  s3DataAsJson();
});
</script>

<template>
  <div
    class="relative flex flex-col min-w-0 bg-clip-border border-none bg-gray-100 rounded-lg p-0 overflow-hidden sm:p-0 sm:rounded-[20px]"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 30px 0px"
  >
    <div class="flex justify-between pt-6 px-6 pb-0">
      <small
        class="text-lg font-normal -tracking-[0.5px] block pb-0 relative z-20"
        >Latest Transactions</small
      >
      <!-- <div class="relative">
        <button
          class="bg-none border-none p-0 absolute left-[10px] top-[10px] z-10"
        >
          <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
            <g fill="#008ffd" fill-rule="nonzero">
              <path
                d="M2.669 8.045a.844.844 0 00.843-.844V1.014A.844.844 0 002.67.17H.98a.844.844 0 00-.843.844V7.2c0 .466.377.844.843.844H2.67zM7.169 8.045a.844.844 0 00.843-.844V1.014A.844.844 0 007.17.17H5.48a.844.844 0 00-.844.844V7.2c0 .466.378.844.844.844H7.17z"
              ></path>
            </g>
          </svg>
        </button>
        <svg
          width="34"
          height="34"
          class="w-[34px] h-[34px]"
          style="transform: rotateY(-180deg) rotateZ(-90deg)"
        >
          <circle r="9" cx="20" cy="20" class="circle-w"></circle>
          <circle r="9" cx="20" cy="20" class="circle-n"></circle>
        </svg>
      </div> -->
    </div>
    <div class="block">
      <!--header-->
      <div
        class="py-0 px-[1.375rem] gap-y-0 gap-x-6 items-center grid w-full mt-[1em] mx-0 mb-3 grid-flow-col-dense grid-cols-4 md:grid-cols-[1fr,2fr,1fr,1fr]"
      >
        <h1
          class="font-light whitespace-nowrap text-[0.85rem]"
          style="text-transform: uppercase"
        >
          Hash
        </h1>
        <h1
          class="font-light whitespace-nowrap text-[0.85rem]"
          style="text-transform: uppercase"
        >
          From
        </h1>
        <h1
          class="font-light whitespace-nowrap text-[0.85rem]"
          style="text-transform: uppercase"
        >
          To
        </h1>
      </div>
      <!--body-->
      <div
        v-for="item in fullData"
        :key="item.hash"
        class="py-2 px-0 text-[0.9rem] max-md:text-[0.7rem] border border-solid border-gray-200 hover:bg-gray-200"
      >
        <div
          class="py-0 px-[1.375rem] gap-y-0 gap-x-6 min-h-[2rem] items-center grid grid-flow-col-dense grid-cols-4 w-full md:grid-cols-[1fr,2fr,1fr,1fr] max-md:text-[0.7rem] max-lg:grid-cols-[2fr,3fr,1fr,1fr]"
        >
          <div class="whitespace-nowrap text-ellipsis overflow-hidden">
            <a
              :href="`/transaction/${item.hash}`"
              @click="transactionClick(item)"
            >
              <span class="text-primary">
                {{ item.hash }}
              </span>
            </a>
          </div>
          <div
            class="max-w-[120px] text-ellipsis overflow-hidden md:max-w-[150px] max-md:max-w-[170px]"
          >
            {{ item.from }}
          </div>
          <div class="text-ellipsis overflow-hidden">{{ item.to }}</div>
        </div>
      </div>
    </div>
    <RouterLink
      to="/transactions"
      class="p-4 text-center border border-solid border-[#e9ecef] font-medium items-center bg-[#f8f9fa] text-xs uppercase text-[#6c757d] hover:text-[#066a9c]"
    >
      View all Transactions
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.circle-w {
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 5px;
  fill: none;
}
.circle-n {
  stroke-dasharray: 56px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 2px;
  stroke: #008ffd;
  fill: none;
  animation: 10s linear 0s infinite normal forwards running kfknxV;
}
@keyframes kfknxV {
  0% {
    stroke-dashoffset: 0px;
  }

  100% {
    stroke-dashoffset: 56px;
  }
}
</style>
