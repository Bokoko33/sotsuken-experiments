<template>
  <div class="exp">
    <p class="exp__num">
      {{ $store.state.expNumber }}/ {{ $store.state.totalExpNum }}
    </p>
    <div class="exp__content">
      <h1 class="exp__head">数字の順番にクリックしてください。</h1>
      <div class="exp__items">
        <ClickPoint
          v-for="i in clickPoints"
          :key="i"
          :num="i"
          :current-num="currentNum"
          :click-func="clickFunction"
        />
      </div>
    </div>
    <Questionnaire v-if="showQuest" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickPoints: [],
      clickPointsLength: 6,
      currentNum: 1,
      showLink: false,
      showQuest: false,
    };
  },
  mounted() {
    for (let i = 0; i < this.clickPointsLength; i++) {
      this.clickPoints.push(i + 1);
    }
    this.shuffle(this.clickPoints);
  },
  methods: {
    shuffle(array) {
      for (let i = array.length; i > 1; i--) {
        const k = Math.floor(Math.random() * i);
        [array[k], array[i - 1]] = [array[i - 1], array[k]];
      }
    },
    clickFunction() {
      this.addCurrentNum();
    },
    addCurrentNum() {
      this.currentNum++;
      if (this.currentNum > this.clickPointsLength) this.showQuest = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.exp {
  width: 100vw;
  height: 100vh;
  background-color: white;
  position: relative;
  cursor: none;
  padding: 10vh 3vw;
  display: flex;
  justify-content: center;
  align-content: center;
  @include device-touch {
    padding-top: 8vh;
  }
}

.exp__num {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 60px;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  @include device-touch {
    font-size: 14px;
  }
}

.exp__content {
  width: 100%;
  @include device-touch {
    width: 90vw;
    height: 100%;
  }
}

.exp__head {
  width: 100%;
  text-align: center;
  @include device-touch {
    font-size: 16px;
  }
}

.exp__items {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  @include device-touch {
    width: 90vw;
    height: 65%;
  }
}
</style>
