<template>
  <div class="interface">
    <div id="trackpad" class="trackpad">
      <p class="trackpad__text">ここを指で操作してください</p>
    </div>
    <div id="cursor" class="cursor">
      <img
        class="cursor__image"
        src="~/assets/images/svg/cursor.svg"
        alt="マウスカーソル"
      />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loop();
  },
  methods: {
    loop() {
      this.$interFace.update();
      requestAnimationFrame(this.loop);
    },
  },
};
</script>

<style lang="scss" scoped>
.trackpad {
  display: none;
  @include device-touch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 10px;
    right: 10px;
    width: 35vw;
    height: 35vh;
    background-color: skyblue;
    opacity: 0.5;
    border-radius: 10px;
    z-index: 100000;
    padding: 8% 10px;
  }
}

.trackpad__text {
  writing-mode: vertical-rl;
}

.cursor {
  position: absolute;
  width: 16px;
  height: 16px;
  top: -8px;
  left: -8px;
  z-index: 100000;
}

.cursor__image {
  width: 100%;
  height: auto;
}
</style>
