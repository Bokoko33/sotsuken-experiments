<template>
  <div class="normal">
    <h1 class="normal__heading">
      こちらが通常のカーソルの動きです。<br />
      しばらく操作し確認したら「次へ」を押してください。
    </h1>
    <div class="normal__link">
      <ClickLink :next-path="'experiment'" :disabled="false" />
    </div>
  </div>
</template>

<script>
// export default {
//   data() {
//     return {
//       disabled: true,
//     };
//   },
//   mounted() {
//     // 通常状態のカーソルをちゃんと操作してもらうため
//     window.setTimeout(this.toggleDisable, 3000);
//   },
//   methods: {
//     toggleDisable() {
//       this.disabled = false;
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.normal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  padding: 10vh 10vw;
  top: 0;
  left: 0;
  background-color: white;
  @include device-touch {
    padding-top: 5vh;
  }
}

.normal__heading {
  width: 100%;
  text-align: center;
  @include device-touch {
    font-size: 16px;
  }
}

.normal__link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20vh;
  @include device-touch {
    bottom: 45vh;
  }
}
</style>
