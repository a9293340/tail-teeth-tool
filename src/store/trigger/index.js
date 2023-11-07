export default {
  namespaced: true,
  state: {
    triggerTimeout: 0,
    triggerSettlement: 0,
    triggerChart: 0,
    triggerReset: 0,
    triggerFinalSettlement: 0,
  },
  mutations: {
    setTriggerTimeout(state, int) {
      state.triggerTimeout = int;
    },
    setTriggerSettlement(state, int) {
      state.triggerSettlement = int;
    },
    setTriggerChart(state, int) {
      state.triggerChart = int;
    },
    setTriggerCReset(state, int) {
      state.triggerReset = int;
    },
    setTriggerFinalSettlement(state, int) {
      state.triggerFinalSettlement = int;
    },
  },
  actions: {
    handleTriggerTimeout({ commit }, int) {
      commit("setTriggerTimeout", int);
    },
    handleTriggerSettlement({ commit }, int) {
      commit("setTriggerSettlement", int);
    },
    handleTriggerChart({ commit }, int) {
      commit("setTriggerChart", int);
    },
    handleTriggerReset({ commit }, int) {
      commit("setTriggerCReset", int);
    },
    handleTriggerFinalSettlement({ commit }, int) {
      commit("setTriggerFinalSettlement", int);
    },
  },
  getters: {
    triggerTimeout(state) {
      return state.triggerTimeout;
    },
    triggerSettlement(state) {
      return state.triggerSettlement;
    },
    triggerChart(state) {
      return state.triggerChart;
    },
    triggerReset(state) {
      return state.triggerReset;
    },
    triggerFinalSettlement(state) {
      return state.triggerFinalSettlement;
    },
  },
};
