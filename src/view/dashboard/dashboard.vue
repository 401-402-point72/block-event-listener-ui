<script setup lang="ts">
// import Search from '@/components/dashboard/search.vue';
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
const lastTime = ref(0);
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
    const _time = dayjs(response.Contents?.[0]?.LastModified).unix();
    lastTime.value = _time;
    if (lastTime.value !== 0) {
      time.value = (_time - lastTime.value).toFixed(2).toString();
    }

    const value = parseInt(response.Contents?.[0]?.Key!, 16).toString();
    if (number.value !== value) {
      progress.value = 0;
    } else if (progress.value < 100) {
      progress.value += 0.5;
    }
    number.value = value;
  } catch (error) {
    console.error(`Error connecting to S3: ${error}`);
  }
}

const getData = async () => {
  await fetchS3Objects();

  // @ts-ignore
  timeout = setTimeout(() => {
    getData();
  }, 3000);
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
  <!-- <Search /> -->
  <Time :number="number" :progress="progress" :time="time" />
  <Tps :data="data" />
  <Stake :data="data" />
  <Recent />
</template>
