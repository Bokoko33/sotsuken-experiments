<template>
  <div class="finished">
    <p class="finished__text">
      実験は以上になります。<br />
      {{ stateText }}
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ansewr: '',
      stateText: '回答を送信中です。そのまましばらくお待ちください。',
    };
  },
  mounted() {
    this.ansewr = `パターン: ${this.$interFace.forcePattern}, 回答: ${this.$store.state.questAnswer}`;
    this.submit();
  },
  methods: {
    submit() {
      const submitParams = new FormData();
      submitParams.append('entry.757631055', this.ansewr);

      // CROS対策
      const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
      // formのaction属性
      const formAction =
        'https://docs.google.com/forms/u/1/d/e/1FAIpQLSfI0pUOp_KSWbT1ooxfm05npopWZLoVVM8sr9Fxdw_NLS1XEw/formResponse';

      const url = CORS_PROXY + formAction;

      axios
        .post(url, submitParams)
        .then((res) => {
          this.stateText =
            '回答の送信が完了しました。ブラウザを閉じて終了してください。';
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.finished__text {
  font-size: 20px;
  text-align: center;
}
</style>
