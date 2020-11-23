<template>
  <div class="finished">
    <h1 class="finised__heading">最後に記述でのアンケートにお答えください。</h1>
    <p class="finished__quest">
      実験中、「通常のカーソルと動きが違う」と感じたものについて、具体的にどう違うと感じましたか。主観で良いので自由にお答えください。
    </p>
    <form class="finished__form" @submit.prevent="submit">
      <textarea v-model="comment" class="finished__textarea"></textarea>
      <input
        type="submit"
        class="finished__button"
        value="送信"
        :class="{ disabled: !buttonActive }"
      />
    </form>
    <div v-if="visibleFinishedModal" class="finished__modal">
      <p class="finished__modal-text">
        実験は以上になります。ご協力いただきありがとうございました。
      </p>
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

      axios
        .post(url, submitParams)
        .then((res) => {
          this.visibleFinishedModal = true;
        })
        .catch((error) => {
          if (error) alert('送信できませんでした。');
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
}

.finished__heading {
  text-align: center;
}

.finished__quest {
  font-size: 18px;
  margin-top: 60px;
}

.finished__form {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.finished__textarea {
  width: 100%;
  height: 120px;
}

.finished__button {
  margin-top: 40px;
  width: 60px;
  height: 40px;
  color: white;
  background-color: orange;
}

.disabled {
  opacity: 0.5;
}

.finished__modal {
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
