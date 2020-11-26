<template>
  <div class="finished">
    <p class="finished__note">
      お疲れ様でした。このページでは通常のタッチ操作ができます。
    </p>
    <h1 class="finished__heading">
      最後に記述でのアンケートにお答えください。
    </h1>
    <p class="finished__quest">
      実験中、「通常のカーソルと動きが違う」と感じたものについて、具体的にどう違うと感じましたか。主観で良いので自由にお答えください。
    </p>
    <form class="finished__form" @submit.prevent="submit">
      <textarea
        v-model="comment"
        class="finished__textarea"
        placeholder="「〇〇な感じがした」などなんでもOKです。"
      ></textarea>
      <input
        type="submit"
        class="finished__button"
        value="送信"
        :class="{ disabled: !buttonActive }"
      />
    </form>
    <div v-if="visibleFinishedModal" class="finished__modal">
      <p class="finished__modal-text">
        アンケート結果の送信が完了しました。実験は以上になります。<br />ご協力いただきありがとうございました。
      </p>
    </div>
    <div v-if="visibleFinishedOverlay" class="finished__overlay">
      <p class="finished__overlay-text">送信中...</p>
      <div class="finished__overlay-icon"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      comment: '',
      buttonActive: false,
      visibleFinishedOverlay: false,
      visibleFinishedModal: false,
    };
  },
  watch: {
    comment() {
      if (this.comment !== '' && this.comment.match(/\S/g)) {
        this.buttonActive = true;
      } else {
        this.buttonActive = false;
      }
    },
  },
  methods: {
    submit() {
      if (!this.buttonActive) return;

      const submitParams = new FormData();

      const answer = `抵抗力提示パターン : ${this.$interFace.forcePattern}
                      普段のポインター速度 : ${this.$store.state.defaultMouseSpeed}
                      タスクごとの回答 : ${this.$store.state.questAnswer}
                      最後のコメント : ${this.comment}`;

      submitParams.append('entry.972973618', answer);

      // CROS対策
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      // formのaction属性
      const formAction =
        'https://docs.google.com/forms/u/1/d/e/1FAIpQLSfI0pUOp_KSWbT1ooxfm05npopWZLoVVM8sr9Fxdw_NLS1XEw/formResponse';

      const url = CORS_PROXY + formAction;

      this.buttonActive = false; // 複数回押せないように
      this.visibleFinishedOverlay = true; // 待機オーバーレイ

      axios
        .post(url, submitParams)
        .then((res) => {
          this.visibleFinishedModal = true;
          this.visibleFinishedOverlay = false;
        })
        .catch((error) => {
          if (error) alert('送信できませんでした。');
          this.visibleFinishedOverlay = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.finished {
  width: 100vw;
  height: 100vh;
  padding: 15vh 15vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: auto;
  @include device-touch {
    padding: 8vh 15vw;
  }
}

.finished__note {
  display: none;
  @include device-touch {
    display: block;
    font-size: 14px;
    color: orange;
  }
}

.finished__heading {
  text-align: center;
  @include device-touch {
    font-size: 20px;
    margin-top: 10px;
  }
}

.finished__quest {
  font-size: 18px;
  margin-top: 60px;
  @include device-touch {
    margin-top: 40px;
  }
}

.finished__form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
}

.finished__textarea {
  width: 100%;
  height: 120px;
}

.finished__button {
  margin-top: 40px;
  color: white;
  background-color: orange;
  width: 100px;
  height: 60px;
  border-radius: 6px;
}

.disabled {
  opacity: 0.5;
}

.finished__overlay {
  padding: 0 10vw;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.7;
}

.finished__overlay-text {
  color: white;
  font-size: 18px;
  margin-right: 10px;
}

.finished__overlay-icon {
  display: block;
  width: 10px;
  height: 10px;
  border: solid 2px white;
  animation: 2s ease-in-out infinite normal forwards running rotate;
  transform: rotate(45deg);
}

@keyframes rotate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(765deg);
  }
}

.finished__modal {
  padding: 0 10vw;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}
</style>
