<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import s3Client from '@/services/s3Client.ts';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  _Object,
} from '@aws-sdk/client-s3';
import { s3DataType } from '../data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRoute } from 'vue-router';

dayjs.extend(relativeTime);

const bucketName = 'rustbucketethereum';
const s3Objects = reactive<_Object[]>([]);
const data = reactive<s3DataType[]>([]);
const { query } = useRoute();

const pageProps = reactive({
  pageNum: Number(query?.p || 1) as number,
  pageSize: 10,
});

function blockClick(item: s3DataType) {
  window.localStorage.setItem('blockItem', JSON.stringify(item));
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

  let fullData: s3DataType[] = [];
  for (const object of s3Objects) {
    try {
      const getObjectParams = { Bucket: bucketName, Key: object.Key };
      const objectData = await s3Client.send(
        new GetObjectCommand(getObjectParams)
      );

      // Read object data and convert to a readable JSON format
      const _data = await objectData?.Body?.transformToString();
      const jsonContent: s3DataType['content'] = JSON.parse(_data || ''); // Parse the raw data
      const length = pageProps.pageNum * pageProps.pageSize; // total
      if (fullData.length < length) {
        fullData.push({ key: object.Key, content: jsonContent });
      } else {
        const start = pageProps.pageNum === 1 ? 0 : pageProps.pageSize;
        fullData = fullData.slice(start, length);
        break;
      }
    } catch (error) {
      console.error(error);
    }
  }
  data.push(...fullData);
}

onMounted(() => {
  s3DataAsJson();
});
</script>

<template>
  <div
    class="relative flex flex-col min-w-0 bg-clip-border border-none bg-white rounded-lg overflow-hidden sm:p-0 sm:rounded-[20px]"
    style="box-shadow: rgba(0, 0, 0, 0.2) 0px 15px 30px 0px"
  >
    <div class="relative w-full pb-[15px]">
      <div>
        <nav>
          <ul
            class="list-none gap-1 flex justify-center items-center mb-2 mt-2"
          >
            <li>
              <a
                class="p-2 bg-[#f8f9fa]"
                :href="`/blocks/?p=${
                  pageProps.pageNum - 1 === 0 ? 1 : pageProps.pageNum - 1
                }`"
              >
                Previous
              </a>
            </li>
            <li>
              <span class="page-link whitespace-nowrap p-2 bg-[#f8f9fa]"
                >Page {{ pageProps.pageNum }} of {{ pageProps.pageSize }}</span
              >
            </li>
            <li>
              <a
                class="p-2 bg-[#f8f9fa]"
                :href="`/blocks/?p=${pageProps.pageNum + 1}`"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="overflow-hidden relative h-full pb-3">
        <div class="relative">
          <table class="w-full table text-white mb-0 font-normal">
            <thead class="whitespace-nowrap border-none font-normal">
              <tr class="border-none font-normal">
                <th
                  class="border-none text-[#262626] font-bold text-sm pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Block
                </th>
                <th
                  class="border-none text-[#262626] text-sm font-bold pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Age
                </th>
                <th
                  class="border-none text-[#262626] text-sm font-bold pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Txn
                </th>
                <th
                  class="border-none text-[#262626] text-sm font-bold pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Fee Recipient
                </th>
                <th
                  class="border-none text-[#262626] text-sm font-bold pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Gas Used
                </th>
                <th
                  class="border-none text-[#262626] text-sm font-bold pt-[1.625rem] px-[1.375rem] pb-2 align-middle first:text-left"
                  style="text-transform: uppercase"
                >
                  Gas Limit
                </th>
              </tr>
            </thead>
            <tbody class="whitespace-nowrap border-none font-normal">
              <tr
                v-for="item in data"
                :key="item.key"
                class="border border-solid border-gray-200 font-normal"
              >
                <td
                  class="border-none w-[128px] font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="whitespace-nowrap">
                    <a
                      :href="`/block/${item.key}`"
                      class="text-primary hover:underline"
                      @click="blockClick(item)"
                    >
                      <span
                        class="ml-[5px] text-ellipsis overflow-hidden max-w-[10rem] block"
                        >{{ item.key }}</span
                      >
                    </a>
                  </div>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <span
                    class="relative overflow-visible inline-flex mr-[4px] text-[#000]"
                  >
                    {{ dayjs(item.content.timestamp).fromNow() }}
                  </span>
                </td>
                <td
                  class="border-none text-ellipsis overflow-hidden font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle text-[#000]"
                >
                  {{ item.content.numberOfTransactions }}
                </td>
                <td
                  class="text-[#000] border-none text-ellipsis overflow-hidden font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  {{ item.content.authorAddress }}
                </td>
                <td
                  class="border-none text-[#000] font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="relative cursor-default inline-flex">
                    <div class="relative cursor-default inline-block">
                      {{ item.content.blockGasUsed }}
                    </div>
                  </div>
                </td>
                <td
                  class="border-none font-normal pt-[0.9375rem] px-[1.375rem] pb-[0.875rem] align-middle"
                >
                  <div class="relative cursor-default inline-flex">
                    <div
                      class="relative cursor-default inline-block text-ellipsis overflow-hidden text-[#000]"
                    >
                      {{ item.content.gasLimit }}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
tbody {
  tr:nth-child(2n + 1) {
    background: #f9f9f9;
  }
}
.table > :not(caption) > * > * {
  padding: 0.6rem 0.5rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: var(--bs-border-width);
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
</style>
