<template>
  <div class="intro">
    <h1 class="intro__heading">実験についての説明</h1>
    <p class="intro__note">*全て読んでから次に進んでください。</p>
    <div class="intro__desc-pc">
      <p class="intro__text">
        この実験サイトでは、動きを遅延したカーソルを操作していただき、抵抗感を感じたかどうかの検証を行います。<br />
        遅延したカーソルと通常状態のカーソルの操作感を何度か比較していただき、その都度アンケートに答えていただきます。<br />
        所要時間は<strong class="intro__strong">5分〜10分</strong
        >程度です。時間の計測は特に行っていませんので、あまり実験を意識せず普段通り操作してください。
      </p>
      <p class="intro__text">
        本実験にご協力いただく前に以下の設定をお願いいたします。
      </p>
      <ol class="intro__list">
        <li class="intro__list-item">
          ・お使いのマウスまたはトラックパッドの<strong class="intro__strong"
            >ポインターの速さ</strong
          >をご確認ください。
          <p class="intro__list-item-note">
            左上のりんごマーク → システム環境設定 →
            マウスまたはトラックパッド（お使いの環境に合わせて選択してください）→
            軌跡の速さ
          </p>
        </li>
        <li class="intro__list-item">
          ・現在のポインターの速さを<strong class="intro__strong"
            >一番遅い方を「1」とした場合</strong
          >の数字で入力してください →
          <select v-model="selectedNum" class="intro__list-item-select">
            <option value="">選択して下さい</option>
            <option v-for="i in mouseSpeeds" :key="i" :value="i">
              {{ i }}
            </option>
          </select>
        </li>
        <li class="intro__list-item">
          ・入力が完了しましたら、<strong class="intro__strong"
            >システム環境設定</strong
          >からポインターの速さを
          <strong class="intro__strong">遅い方から3番目</strong>
          に設定し直してください。
        </li>
        <li class="intro__list-item">
          ・<strong class="intro__strong">ブラウザのウィンドウを最大化</strong
          >してください
        </li>
      </ol>
    </div>
    <div class="intro__desc-sp">
      <p class="intro__text">
        この実験サイトでは、スマートフォンから操作する場合にもマウスカーソルを用います。<strong
          class="intro__strong"
          >次のページから、画面右下に仮想のトラックパッドが出現する</strong
        >ので、そこから操作してください。<br />
        <br />
        本実験では、動きを遅延したカーソルを操作していただき、抵抗感を感じたかどうかの検証を行います。<br />
        遅延したカーソルと通常状態のカーソルの操作感を何度か比較していただき、その都度アンケートに答えていただきます。<br />
        所要時間は<strong class="intro__strong">5分〜10分</strong
        >程度です。時間の計測は特に行っていませんので、あまり実験を意識せず普段通り操作してください。
      </p>
    </div>
    <br />
    <p class="intro__note">
      *ブラウザの「戻る」ボタンの使用、リロードはしないでください。不具合などありましたら、お手数ですが依頼者までご報告いただけますと幸いです。
    </p>
    <div to="/normal" class="intro__link" @click="clicked">始める</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mouseSpeeds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedNum: '',
    };
  },
  methods: {
    clicked() {
      if (window.innerWidth > this.$store.state.breakPoint) {
        if (!this.selectedNum) {
          alert(
            '普段のポインターの速さを入力してください。（本実験用に設定済みで忘れてしまった場合は目安で構いません）'
          );
          return;
        }
        this.$store.commit('setDefaultMouseSpeed', this.selectedNum);
      }
      this.$router.push('normal');
    },
  },
};
</script>

<style lang="scss" scoped>
.intro {
  width: 100vw;
  height: 100vh;
  padding: 8vh 10vw 0;
  line-height: 1.6;
  cursor: auto;
  @include device-touch {
    padding: 40px 10vw 40px;
    height: auto;
  }
}

.intro__heading {
  @include device-touch {
    font-size: 24px;
  }
}

.intro__note {
  color: red;
}

.intro__desc {
  margin-top: 40px;
}

.intro__desc-pc {
  display: block;
  @include device-touch {
    display: none;
  }
}

.intro__desc-sp {
  display: none;
  @include device-touch {
    display: block;
  }
}

.intro__text {
  margin-top: 40px;
}

.intro__list-item {
  margin-top: 10px;
}

.intro__list-item-note {
  margin-left: 20px;
}

.intro__list-item-select {
  border: solid 1px orange;
  color: orange;
  border-radius: 6px;
}

.intro__strong {
  font-weight: 700;
}

.intro__link {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  border: solid 1px orange;
  color: orange;
  border-radius: 6px;

  margin: 10vh auto 0;
  &:hover {
    color: white;
    background-color: orange;
  }
  @include device-touch {
    margin-bottom: 5vh;
  }
}
</style>
