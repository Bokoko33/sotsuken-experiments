<template>
  <div class="normal">
    <h1 class="normal__heading">
      こちらが通常のカーソルの動きです。<br />
      しばらく操作し確認したら「次へ」を押してください。
    </h1>
    <div class="normal__link">
      <ClickLink
        :click-item-length="0"
        :current-num="1"
        :next-path="'experiment'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.normal {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: white;
}

.normal__heading {
  width: 100%;
  text-align: center;
  margin-top: 10vh;
  @include device-touch {
    font-size: 16px;
  }
}

.normal__link {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20vh;
}
</style>
