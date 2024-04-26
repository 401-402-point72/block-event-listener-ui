<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
let chart;
const main = ref(null);
onMounted(() => {
  var chartData = [];

  function generateChartData() {
    var firstDate = new Date();
    firstDate.setTime(firstDate.getTime() - 10 * 24 * 60 * 60 * 1000);

    for (
      var i = firstDate.getTime();
      i < firstDate.getTime() + 10 * 24 * 60 * 60 * 1000;
      i += 60 * 60 * 1000
    ) {
      var newDate = new Date(i);

      if (i == firstDate.getTime()) {
        var value1 = Math.round(Math.random() * 10) + 1;
      } else {
        var value1 =
          Math.round(
            (chartData[chartData.length - 1].value1 / 100) *
              (90 + Math.round(Math.random() * 20)) *
              100
          ) / 100;
      }

      chartData.push({
        date: newDate,
        value1: value1,
      });
    }
  }
  generateChartData();

  chart = AmCharts.makeChart(main.value!, {
    type: 'serial',
    theme: 'none',
    color: 'rgb(105, 245, 225)',
    // pathToImages: '/lib/3/images/',
    dataProvider: chartData,
    graphs: [
      {
        balloonText: '[[title]]: [[value]]',
        lineThickness: 2,
        title: 'intra-day',
        valueField: 'value1',
        lineColor: 'rgb(105, 245, 225)', // 设置折线图的颜色为蓝色
      },
    ],
    zoomOutButtonRollOverAlpha: 0.15,
    chartCursor: {
      showNextAvailable: false,
      cursorColor: 'rgb(105, 245, 225)', // 设置底部工具的颜色为蓝色
    },
    autoMarginOffset: 5,
    columnWidth: 1,
    categoryField: 'date',
    categoryAxis: {
      minPeriod: 'hh',
      parseDates: true,
      axisAlpha: 0, // 隐藏 x 轴
      labelsEnabled: false, // 隐藏 x 轴的标签
      gridAlpha: 0, // 隐藏 x 轴的网格线
      guides: [
        {
          alpha: 0.5,
          lineThickness: 3,
          lineColor: '#c00',
          date: chartData[0].date,
        },
      ],
    },
    valueAxes: [
      {
        axisAlpha: 0, // 隐藏 y 轴
        labelsEnabled: false, // 隐藏 y 轴的标签
        gridAlpha: 0, // 隐藏 y 轴的网格线
      },
    ],
  });
});

onUnmounted(() => {
  chart && chart.clear();
});
</script>

<template>
  <div
    class="my-6 flex flex-col min-w-0 bg-clip-border text-[rgb(211,211,211)] border-none bg-[rgb(49,49,49)] relative py-[15px] px-[30px] sm:py-[30px] sm:px-[60px] sm:rounded-[20px] overflow-visible"
    style="box-shadow: rgb(0 0 0 / 20%) 0px 15px 30px 0px"
  >
    <div class="flex flex-col lg:flex-row">
      <div class="flex flex-col justify-between sm:flex-row lg:flex-col">
        <div class="flex items-center w-full justify-between">
          <div>
            <small
              class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
              >Current TPS</small
            >
            <p
              class="leading-none mb-0 text-4xl font-semibold -tracking-[0.3px] text-[rgb(105,245,225)] whitespace-nowrap w-auto"
            >
              <span>2,102</span>
            </p>
          </div>
        </div>
        <div class="mt-4 sm:mt-0">
          <div>
            <div class="flex items-center w-full justify-between">
              <div>
                <small
                  class="text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex pb-0 items-center"
                  >Current TPS</small
                >
                <p
                  class="leading-none mb-0 font-semibold -tracking-[0.3px] text-[rgb(105,245,225)] whitespace-nowrap w-auto text-2xl sm:text-4xl"
                >
                  <span>283,289,796,715</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div
          class="h-full w-[1px] bg-[rgba(29,29,29,0.5)] my-0 mx-[45px] flex-1"
        ></div>
      </div>
      <div class="flex flex-col h-full flex-grow">
        <small
          class="mt-4 lg:mt-0 lg:mb-2 text-sm text-[rgb(136,136,136)] -tracking-[0.5px] flex items-center"
        >
          Instruction Breakdown
          <span>- 3.00 min AVG</span>
        </small>
        <div class="flex flex-col-reverse md:flex-row">
          <div class="flex-1 bg-[rgb(38,38,38)] rounded-lg relative">
            <div ref="main" class="w-full h-[145px]"></div>
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
