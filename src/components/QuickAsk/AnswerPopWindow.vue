<script>
import { useStore } from "vuex";
import { computed, reactive, watch } from "vue";

export default {
  name: "AnswerPopWindow",
  setup() {
    const store = useStore();
    const pickConfig = computed(() => store.getters["GameZone/pickConfig"]);
    const isShowShadow = computed(() => store.getters.isShowShadow);
    const imgAns = reactive({ data: null });

    watch(isShowShadow, (newIndex) => {
      console.log(newIndex);
      if (pickConfig.value["answer"]["type"] !== "text")
        imgAns.data =
          pickConfig.value["answer"]["type"] === "img"
            ? require(`@/assets/resources/tail_teeth${pickConfig.value["answer"]["detail"]}`)
            : pickConfig.value["answer"]["detail"];
    });

    return {
      pickConfig,
      imgAns,
    };
  },
};
</script>

<template>
  <div class="answer-pop-window" v-if="Object.keys(pickConfig).length">
    <p v-if="pickConfig['answer']['type'] === 'text'">
      <span v-for="detail in pickConfig['answer']['detail']" :key="detail">
        {{ detail }}
      </span>
    </p>
    <img
      :src="imgAns.data"
      alt=""
      v-else-if="pickConfig['answer']['type'] === 'img'"
    />
    <iframe
      v-else
      width="700"
      height="500"
      :src="imgAns.data"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<style lang="scss" scoped>
@import "~@/assets/css-api/_color.scss";
@import "~@/assets/css-api/_format.scss";
.answer-pop-window {
  width: 1000px;
  height: 800px;
  position: fixed;
  overflow-y: auto;
  @extend %scroll;
  z-index: 30000;
  background-color: white;
  box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: 0.3);
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
  @extend %flex-row-center;
  padding: 25px;
  p {
    width: 100%;
    font-size: 40px;
    font-weight: 900;
    color: $grey2;
    @extend %flex-column-al-center-ju-start;
    span {
      width: 100%;
      font-size: 40px;
      font-weight: 900;
      color: $grey2;
    }
  }
  img {
    width: 800px;
    max-height: 99%;
  }
}
</style>
