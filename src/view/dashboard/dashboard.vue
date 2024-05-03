<script setup lang="ts">
import Search from './search.vue';
import Time from '@/components/dashboard/time.vue';
import Tps from '@/components/dashboard/tps.vue';
import Stake from '@/components/dashboard/stake.vue';
import Recent from '@/components/dashboard/recent/recent.vue';
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import coinGeckoClient from '@/services/coinGeckoClient';
import s3Client from '@/services/s3Client';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import dayjs from 'dayjs';

let timeout = 0;
const data = reactive({});
const number = ref('');
const progress = ref(0);
const time = ref('0');
const fetchCoinData = async () => {
  const response = await coinGeckoClient.get('/coins/markets', {
    params: {
      vs_currency: 'usd', // Fetch prices in USD
      ids: 'ethereum,solana', // Coins to fetch
    },
  });
  // Proper error handling
  if (response.data && response.data.length > 0) {
    Reflect.set(
      data,
      'ethereum',
      response.data.find((coin: any) => coin.id === 'ethereum') || {}
    );
    Reflect.set(
      data,
      'solana',
      response.data.find((coin: any) => coin.id === 'solana') || {}
    );
  }
};

const bucketName = 'rustbucketethereum';

async function fetchS3Objects() {
  try {
    const response = await s3Client.send(
      new ListObjectsV2Command({ Bucket: bucketName })
    );

    const last = dayjs(
      response.Contents?.[response.Contents?.length - 1]?.LastModified
    ).unix();
    const pre = dayjs(
      response.Contents?.[response.Contents?.length - 2]?.LastModified
    ).unix();

    time.value = (last - pre).toFixed(2).toString();

    const value = parseInt(
      response.Contents?.[response.Contents?.length - 1]?.Key!,
      16
    ).toString();
    number.value = value;
    progress.value = Number(number.value) % 32;
  } catch (error) {
    console.error(`Error connecting to S3: ${error}`);
  }
}

const getData = async () => {
  await fetchS3Objects();

  // @ts-ignore
  timeout = setTimeout(() => {
    getData();
  }, 10 * 1000);
};

onMounted(() => {
  getData();
  fetchCoinData();
});

onUnmounted(() => {
  // @ts-ignore
  clearTimeout(timeout);
});
</script>

<template>
  <Search placeholder="Search..." />
  <Time :number="number" :progress="progress" :time="time" />
  <Tps :data="data" />
  <Stake :data="data" />
  <Recent />
</template>
