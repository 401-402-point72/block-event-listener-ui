<template>
  <div>
    <h1>Cryptocurrency Dashboard</h1>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <!-- Ethereum Section -->
      <div v-if="ethereum.current_price" class="crypto-section">
        <h2>Ethereum (ETH)</h2>
        <div class="crypto-info">
          <p>Current Price: {{ ethereum.current_price.toFixed(2) }} USD</p>
          <p>
            Market Cap:
            {{
              ethereum.market_cap ? ethereum.market_cap.toFixed(2) : 'N/A'
            }}
            USD
          </p>
          <p>
            Circulating Supply:
            {{
              ethereum.circulating_supply ? ethereum.circulating_supply : 'N/A'
            }}
          </p>
          <p>
            Total Supply:
            {{ ethereum.total_supply ? ethereum.total_supply : 'N/A' }}
          </p>
          <p>
            24-Hour Volume:
            {{
              ethereum.total_volume ? ethereum.total_volume.toFixed(2) : 'N/A'
            }}
            USD
          </p>
          <p>
            Price Change (24h):
            {{
              ethereum.price_change_percentage_24h
                ? ethereum.price_change_percentage_24h.toFixed(2)
                : 'N/A'
            }}%
          </p>
          <p>
            24-Hour High:
            {{ ethereum.high_24h ? ethereum.high_24h.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            24-Hour Low:
            {{ ethereum.low_24h ? ethereum.low_24h.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            All-Time High:
            {{ ethereum.ath ? ethereum.ath.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            All-Time Low:
            {{ ethereum.atl ? ethereum.atl.toFixed(2) : 'N/A' }} USD
          </p>
          <p>Last Updated: {{ ethereum.last_updated }}</p>
        </div>
        <canvas id="ethPriceChart"></canvas>
      </div>

      <!-- Solana Section -->
      <div v-if="solana.current_price" class="crypto-section">
        <h2>Solana (SOL)</h2>
        <div class="crypto-info">
          <p>Current Price: {{ solana.current_price.toFixed(2) }} USD</p>
          <p>
            Market Cap:
            {{ solana.market_cap ? solana.market_cap.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            Circulating Supply:
            {{ solana.circulating_supply ? solana.circulating_supply : 'N/A' }}
          </p>
          <p>
            Total Supply:
            {{ solana.total_supply ? solana.total_supply : 'N/A' }}
          </p>
          <p>
            24-Hour Volume:
            {{
              solana.total_volume ? solana.total_volume.toFixed(2) : 'N/A'
            }}
            USD
          </p>
          <p>
            Price Change (24h):
            {{
              solana.price_change_percentage_24h
                ? solana.price_change_percentage_24h.toFixed(2)
                : 'N/A'
            }}%
          </p>
          <p>
            24-Hour High:
            {{ solana.high_24h ? solana.high_24h.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            24-Hour Low:
            {{ solana.low_24h ? solana.low_24h.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            All-Time High: {{ solana.ath ? solana.ath.toFixed(2) : 'N/A' }} USD
          </p>
          <p>
            All-Time Low: {{ solana.atl ? solana.atl.toFixed(2) : 'N/A' }} USD
          </p>
          <p>Last Updated: {{ solana.last_updated }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';
import coinGeckoClient from '@/services/coinGeckoClient';

export default {
  data() {
    return {
      ethereum: {},
      solana: {},
      error: null,
      ethChartData: [],
      ethChart: null,
    };
  },
  mounted() {
    this.fetchCoinData();
    this.fetchHistoricalData();
  },
  methods: {
    async fetchCoinData() {
      try {
        const response = await coinGeckoClient.get('/coins/markets', {
          params: {
            vs_currency: 'usd',
            ids: 'ethereum,solana',
          },
        });
        if (response.data && response.data.length > 0) {
          this.ethereum =
            response.data.find((coin) => coin.id === 'ethereum') || {};
          this.solana =
            response.data.find((coin) => coin.id === 'solana') || {};
        } else {
          this.error = 'No data found for Ethereum or Solana';
        }
      } catch (error) {
        this.error = `Error fetching coin data: ${error.message}`;
      }
    },
    async fetchHistoricalData() {
      const url = `https://api.coingecko.com/api/v3/coins/ethereum/market_chart`;
      try {
        const response = await axios.get(url, {
          params: {
            vs_currency: 'usd',
            days: '1',
          },
        });
        if (response.data) {
          this.ethChartData = response.data.prices;
          this.renderChart();
        }
      } catch (error) {
        this.error = `Error fetching historical data: ${error.response.data.error}`;
      }
    },

    renderChart() {
      const ctx = document.getElementById('ethPriceChart').getContext('2d');
      const chartData = {
        labels: this.ethChartData.map((item) => new Date(item[0])),
        datasets: [
          {
            label: 'Ethereum Price (USD)',
            data: this.ethChartData.map((item) => item[1]),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };
      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                tooltipFormat: 'dd MMM yyyy HH:mm',
              },
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
          },
          responsive: true,
        },
      });
    },
  },
};
</script>

<style scoped>
.crypto-section {
  background-color: #f5f5f5;
  padding: 15px;
  margin-bottom: 20px;
}
h2 {
  color: #333;
  margin-top: 0;
}
.crypto-info {
  padding: 10px;
}
p {
  margin: 5px 0;
}
</style>
