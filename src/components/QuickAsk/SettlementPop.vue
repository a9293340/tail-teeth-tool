<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useStore } from "vuex";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { computed, getCurrentInstance, ref } from "vue";

Chart.register(ChartDataLabels, ...registerables);
export default {
  name: "SettlementPop",
  components: {
    BarChart,
  },
  setup() {
    const store = useStore();
    const { _ } = getCurrentInstance().appContext.config.globalProperties;
    const teamScorePoint = computed(() => store.getters.teamScorePoint);
    const borderColor = computed(() => store.getters.borderColor);
    const doughnutRef = ref();
    const backgroundColor = borderColor.value.map(
      (el) =>
        `${el.slice(0, _.lastIndexOf(el.split(""), ")"))},0.4${el.slice(
          _.lastIndexOf(el.split(""), ")")
        )}`
    );
    const chartData = computed(() => ({
      labels: ["team 1", "team 2", "team 3", "team 4", "team 5", "team 6"],
      datasets: [
        {
          axis: "y",
          data: teamScorePoint.value,
          datalabels: {
            display: (val) => val.dataset.data[val.dataIndex],
            color: (val) => borderColor.value[val.dataIndex],
            font: {
              weight: "bold",
              size: 22,
            },
          },
          barThickness: 18,
          fill: false,
          backgroundColor,
          borderColor: borderColor.value,
          borderWidth: 1,
        },
      ],
    }));
    const options = ref({
      responsive: true,
      indexAxis: "y",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Doughnut Chart",
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            major: {
              enabled: true,
            },
            font: {
              weight: "bold",
              size: 18,
            },
          },
        },
        y: {
          stacked: true,
          ticks: {
            major: {
              enabled: true,
            },
            color: (val) => borderColor.value[val.index],
            font: {
              weight: "bold",
              size: 18,
            },
          },
        },
      },
      datalabels: {
        display: "auto",
        color: "#005599",
        backgroundColor: "rgb(210,210,210,0.8)",
        font: {
          weight: "bold",
          size: 30,
        },
        anchor: "end",
        align: "end",
        offset: 4,
      },
    });
    return {
      chartData,
      doughnutRef,
      options,
    };
  },
};
</script>

<template>
  <div class="settlement-pop">
    <div class="pop-top"></div>
    <div class="pop-main">
      <BarChart
        class="bar"
        ref="doughnutRef"
        :chartData="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.settlement-pop {
  width: 1200px;
  height: 850px;
  position: fixed;
  z-index: 30000;
  background-color: white;
  box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.3);
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
  @extend %flex-column-al-center-ju-center;
  padding: 25px;
  .pop-top {
    width: 100%;
    height: 15%;
  }
  .pop-main {
    width: 100%;
    height: 85%;
    @extend %flex-column-al-center-ju-center;
    .bar {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
