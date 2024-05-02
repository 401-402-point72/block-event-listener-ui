<template>
  <div>
    <h1>CoinGecko API Test</h1>
    <coin-price />
  </div>
</template>

<script>
import CoinPrice from '@/components/coin-gecko1.vue';

export default {
  components: {
    CoinPrice,
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
