<script>
import Serialport from "serialport";
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "TestingPop",
  setup() {
    const store = useStore();
    const testingWords = ref([]);
    const com = computed(() => store.getters.com);
    let mainPort = null;
    const change = [
      {
        from: "045",
        to: "01",
      },
      {
        from: "052",
        to: "02",
      },
      {
        from: "044",
        to: "03",
      },
      {
        from: "056",
        to: "04",
      },
      {
        from: "2B",
        to: "05",
      },
      {
        from: "05",
        to: "06",
      },
    ];

    const testing = () => {
      mainPort = new Serialport(com.value, { baudRate: 9600 });
      mainPort.on("data", (data) => {
        testingWords.value.push(
          data
            .toString()
            .substring(0, data.toString().length - 1)
            .split(":")
            .map((e, i) =>
              !i
                ? `Team ${
                    change.find((el) => e.lastIndexOf(el.from) !== -1).to
                  }`
                : e
            )
            .join(":")
        );
      });
    };

    const closePop = () => {
      testingWords.value = [];
      mainPort.removeAllListeners();
      mainPort.close();
    };

    return {
      testingWords,
      testing,
      closePop,
    };
  },
};
</script>

<template>
  <div class="testing-pop">
    <div class="btn" @click="testing">Testing ! ! !</div>
    <div class="testing-words">
      <div class="testing-word" v-for="test in testingWords" :key="test + 'a'">
        {{ test }}
      </div>
    </div>
    <div class="btn close-btn" @click="closePop">Close</div>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.testing-pop {
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
  .btn {
    @include btn($blue1, white);
    width: 100%;
    height: 45px;
    font-size: 26px;
    margin-bottom: 20px;
  }
  .testing-words {
    width: 100%;
    height: 60%;
    border: 1px solid $grey2;
    overflow-y: auto;
    @extend %scroll;
    padding: 15px;
    @extend %flex-column-al-start-ju-start;
    margin-bottom: 100px;
    .testing-word {
      width: 100%;
      font-size: 26px;
      margin-bottom: 10px;
      font-weight: 900;
      @extend %flex-row-start;
    }
  }
}
</style>
