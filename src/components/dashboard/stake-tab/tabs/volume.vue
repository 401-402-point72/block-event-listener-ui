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
        type: 'column', // 设置图表类型为柱状图
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
    ref="main"
    class="rounded-lg bg-[rgb(38,38,38)] w-full h-[110px] overflow-hidden text-left"
  ></div>
</template>
