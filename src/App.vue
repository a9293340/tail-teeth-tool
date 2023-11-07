<script>
import Serialport from "serialport";
import { useStore } from "vuex";
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";
import AnswerPopWindow from "@/components/QuickAsk/AnswerPopWindow";
import TestingPop from "@/components/TestingPop";
import SettlementPop from "@/components/QuickAsk/SettlementPop";

export default {
  components: {
    AnswerPopWindow,
    TestingPop,
    SettlementPop,
  },
  setup() {
    const store = useStore();
    const controlWindowActions = computed(
      () => store.getters.controlWindowActions
    );
    const isShowShadow = computed(() => store.getters.isShowShadow);
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const { _: lodash } =
      getCurrentInstance().appContext.config.globalProperties;
    const comList = ref([]);
    const pickCom = ref("");
    const isHiddenSelect = ref(false);
    const isShowTesting = ref(false);
    const isShowSettlement = computed(
      () => store.getters["GameZone/isShowSettlement"]
    );

    const windowActions = (types) => {
      store.dispatch(
        "handleControlWindowActions",
        types === "+" || types === "r"
          ? types === "r"
          : controlWindowActions.value
      );
      window.ipcRenderer.send(
        types !== "x" ? "window-action" : "close-all-app",
        types
      );
    };

    const closeShadow = () => {
      store.dispatch("handleIsShowShadow", false);
      store.dispatch("GameZone/handleIsShowSettlement", false);
      isShowTesting.value = false;
    };

    const hiddenSelect = () => (isHiddenSelect.value = !isHiddenSelect.value);

    const saveCom = () => store.dispatch("handleCOM", pickCom.value);

    const searchComport = async () => {
      comList.value = (await Serialport.list()).map((el) => el.path);
      console.log(comList.value);
    };

    const openTesting = () => (isShowTesting.value = true);

    onBeforeMount(() => {
      window.ipcRenderer.once("send-path-data", (eve, args) => {
        store.dispatch(
          "handleResourceDir",
          `${args.documents.replaceAll("\\", "/")}/tail-teeth`
        );
        store.dispatch(
          "handleConfig",
          require("@/assets/resources/sample.json")
        );
      });
      window.ipcRenderer.send("get-path-data");
    });

    onMounted(() => {
      searchComport();
    });

    return {
      controlWindowActions,
      isShowShadow,
      pickConfig,
      comList,
      windowActions,
      lodash,
      closeShadow,
      hiddenSelect,
      searchComport,
      pickCom,
      isHiddenSelect,
      openTesting,
      saveCom,
      isShowTesting,
      isShowSettlement,
    };
  },
};
</script>

<template>
  <div class="tail-teeth">
    <div class="top-list">
      <img src="@/assets/img/svg/wash_hands.svg" alt="" @click="openTesting" />
      <img
        src="@/assets/img/svg/window_shrink.svg"
        alt=""
        @click="windowActions('-')"
      />
      <img
        src="@/assets/img/svg/window_zoom_out.svg"
        v-if="controlWindowActions"
        alt=""
        @click="windowActions('+')"
      />
      <img
        src="@/assets/img/svg/window_zoom_in.svg"
        v-else
        alt=""
        @click="windowActions('r')"
      />
      <img
        src="@/assets/img/svg/window_close.svg"
        @click="windowActions('x')"
        alt=""
      />
    </div>
    <img
      class="logo"
      @click="hiddenSelect"
      src="@/assets/img/logo/logo_120.png"
      alt=""
    />
    <select
      :class="['select', { 'select-none': isHiddenSelect }]"
      v-model="pickCom"
      @click="searchComport"
      @change="saveCom"
    >
      <option v-for="list in comList" :key="list" :value="list">
        {{ list }}
      </option>
    </select>
    <div
      :class="[
        'shadow',
        { 'shadow-show': isShowShadow || isShowTesting || isShowSettlement },
      ]"
      @click="closeShadow"
    ></div>
    <AnswerPopWindow
      v-if="!lodash.isEmpty(pickConfig)"
      :class="{ 'shadow-show': isShowShadow }"
    />
    <TestingPop :class="{ 'shadow-show': isShowTesting }" />
    <SettlementPop :class="{ 'shadow-show': isShowSettlement }" />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  position: relative;
}
.tail-teeth {
  width: 100vw;
  height: 100vh;
  position: relative;
  .logo {
    position: fixed;
    width: 7%;
    //height: 5%;
    top: 10px;
    left: 20px;
  }
  .select {
    display: block;
    position: fixed;
    width: 120px;
    //height: 5%;
    top: 30px;
    left: 120px;
    @extend %select;
  }
  .select-none {
    display: none;
  }
  .top-list {
    width: 100%;
    height: 30px;
    min-height: 30px;
    -webkit-app-region: drag;
    @extend %flex-row-end;
    padding-right: 20px;
    user-select: none;
    z-index: 900;
    background: linear-gradient(90deg, #b4b4b4 0%, #e5e5e5 71%);

    img {
      width: 20px;
      margin-left: 20px;
      cursor: pointer;
      -webkit-app-region: no-drag;
    }
  }
  main {
    width: 100%;
    height: calc(100vh - 30px);
    padding: 20px;
  }
  .shadow {
    @extend %shadow;
  }
  .shadow-show {
    display: block;
  }
}
</style>
