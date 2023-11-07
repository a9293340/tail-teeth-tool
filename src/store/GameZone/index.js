export default {
  namespaced: true,
  state: {
    pickConfig: {},
    timeCount: "20",
    isGoing: false,
    isImgOptions: false,
    isShowOptions: false,
    scanBuffer: [],
    checkScanList: [],
    isShowSettlement: false,
  },
  mutations: {
    setPickConfig(state, obj) {
      state.pickConfig = obj;
    },
    setTimeCount(state, str) {
      state.timeCount = str;
    },
    setIsGoing(state, bool) {
      state.isGoing = bool;
    },
    setIsImgOptions(state, bool) {
      state.isImgOptions = bool;
    },
    setIsShowOptions(state, bool) {
      state.isShowOptions = bool;
    },
    setScanBuffer(state, bool) {
      state.scanBuffer = bool;
    },
    setCheckScanList(state, bool) {
      state.checkScanList = bool;
    },
    setIsShowSettlement(state, bool) {
      state.isShowSettlement = bool;
    },
  },
  actions: {
    handlePickConfig({ commit }, obj) {
      commit("setPickConfig", obj);
    },
    handleTimeCount({ commit }, str) {
      commit("setTimeCount", str);
    },
    handleIsGoing({ commit }, str) {
      commit("setIsGoing", str);
    },
    handleIsImgOptions({ commit }, str) {
      commit("setIsImgOptions", str);
    },
    handleIsShowOptions({ commit }, str) {
      commit("setIsShowOptions", str);
    },
    handleScanBuffer({ commit }, str) {
      commit("setScanBuffer", str);
    },
    handleCheckScanList({ commit }, str) {
      commit("setCheckScanList", str);
    },
    handleIsShowSettlement({ commit }, str) {
      commit("setIsShowSettlement", str);
    },
  },
  getters: {
    pickConfig(state) {
      return state.pickConfig;
    },
    timeCount(state) {
      return state.timeCount;
    },
    isGoing(state) {
      return state.isGoing;
    },
    isImgOptions(state) {
      return state.isImgOptions;
    },
    isShowOptions(state) {
      return state.isShowOptions;
    },
    scanBuffer(state) {
      return state.scanBuffer;
    },
    checkScanList(state) {
      return state.checkScanList;
    },
    isShowSettlement(state) {
      return state.isShowSettlement;
    },
  },
};
