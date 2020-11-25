<template>
  <div class="quest">
    <div class="quest__content">
      <h2 class="quest__heading">当てはまるものを選択してください</h2>
      <p class="quest__question">通常のカーソルの動きと比べて...</p>
      <ul class="quest__radio">
        <li
          v-for="(radio, index) in radios"
          :key="index"
          class="quest__radio-item"
        >
          <QuestionnaireItem
            :radio="radio"
            :selected-id="selectedId"
            :select-func="select"
          />
        </li>
      </ul>
      <div class="quest__link">
        <ClickLink
          :next-path="nextPath"
          :disabled="selectedId === 999"
          :click-func="setAnswer"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radios: [
        { id: -3, text: 'かなり軽い' },
        { id: -2, text: '軽い' },
        { id: -1, text: 'やや軽い' },
        { id: 0, text: '変わらない' },
        { id: 1, text: 'やや重たい' },
        { id: 2, text: '重たい' },
        { id: 3, text: 'かなり重たい' },
      ],
      selectedId: 999, // 初期値
    };
  },
  computed: {
    nextPath() {
      if (this.$store.state.expNumber === this.$store.state.totalExpNum) {
        return 'finished';
      } else {
        return 'normal';
      }
    },
  },
  methods: {
    select(id) {
      this.selectedId = id;
    },
    setAnswer() {
      this.$store.commit('setAnswer', this.selectedId);
    },
  },
};
</script>

<style lang="scss" scoped>
.quest {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.quest__content {
  width: 90%;
  height: 80%;
  max-width: 1000px;
  background-color: white;
  padding: 40px;
  @include device-touch {
    height: 90%;
  }
}

.quest__heading {
  text-align: center;
  @include device-touch {
    font-size: 18px;
  }
}

.quest__question {
  margin-top: 10vh;
  @include device-touch {
    margin-top: 5vh;
  }
}

.quest__radio {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  @include device-touch {
    flex-direction: column;
  }
  // &::before {
  //   display: block;
  //   content: '';
  //   width: 100%;
  //   height: 2px;
  //   background-color: black;
  //   position: absolute;
  //   top: 50%;
  //   @include device-touch {
  //     display: none;
  //   }
  // }
}

.quest__radio-item {
  position: relative;
}

.quest__link {
  width: 100px;
  margin: 20vh auto 0;
  @include device-touch {
    margin-top: 5vh;
  }
}
</style>
