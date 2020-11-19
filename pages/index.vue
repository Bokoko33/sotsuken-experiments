<template>
  <div class="intro">
    <h1 class="intro__heading">実験についての説明</h1>
    <p class="intro__note">全て読んでから次に進んでください。</p>
    <div class="intro__desc">
      <p class="intro__text">
        この実験サイトでは、動きを遅延したカーソルを操作していただき、抵抗感を感じたかどうかの検証を行います。<br />
        遅延したカーソルと通常状態のカーソルの操作感を何度か比較していただき、その都度アンケートに答えていただきます。<br />
        所要時間は5分〜10分程度です。時間の計測は特に行っていませんので、あまり実験を意識せず普段通りデバイスをお使いください。
      </p>
      <p class="intro__text">
        PCをお使いの方は、
        <strong class="intro__strong">ブラウザのウィンドウを最大化</strong
        >してください。
      </p>
      <!-- <ol class="intro__list">
        <li class="intro__list-item">
          お使いのマウス、またはトラックパッドの感度を高く設定されている場合は、
        </li>
        <li class="intro__list-item">
          ブラウザのウィンドウを最大化してください
        </li>
      </ol> -->
    </div>
    <div class="intro__link">
      <ClickLink
        :click-item-length="0"
        :current-num="1"
        :next-path="'normal'"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.intro {
  width: 100vw;
  height: 100vh;
  padding: 100px 10vw 0;
  line-height: 1.6;
  @include device-touch {
    padding-top: 40px;
  }
}

.intro__desc {
  margin-top: 40px;
}

.intro__text {
  margin-top: 20px;
}

.intro__strong {
  font-weight: 700;
}

.intro__link {
  width: 100px;
  margin: 100px auto 0;
}
</style>
