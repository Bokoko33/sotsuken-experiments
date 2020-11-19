<template>
  <div
    ref="point"
    :class="{ hover: hover, clicked: clicked }"
    class="click-point"
  >
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    num: {
      required: true,
      type: Number,
    },
    currentNum: {
      required: true,
      type: Number,
    },
    clickFunc: {
      required: true,
      type: Function,
    },
  },
  data() {
    return {
      element: null,
      hover: false,
      clicked: false,
      width: 0,
      height: 0,
      pos: {
        x: 0,
        y: 0,
      },
    };
  },
  mounted() {
    this.initTransform();
    this.clickEventInit();
    this.collider();
    window.addEventListener('resize', this.initTransform);
  },
  beforeDestroy() {
    this.$interFace.removeEvent(this.clickPoint);
    window.removeEventListener('resize', this.initTransform);
  },
  methods: {
    initTransform() {
      this.element = this.$refs.point;
      // 大きさを参照
      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      // 座標をcssから参照して格納
      const clientRect = this.element.getBoundingClientRect();
      this.pos.x = clientRect.left;
      this.pos.y = clientRect.top;
    },
    clickEventInit() {
      this.$interFace.addEvent(this.clickPoint);
    },
    collider() {
      // クリック済みになるまで検知し続ける
      if (this.currentNum <= this.num) {
        requestAnimationFrame(this.collider);
      }
      // あたり判定
      if (this.num !== this.currentNum) return;
      if (this.clicked) return;

      this.hover = this.$interFace.onTriggerEnter(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      );
    },
    clickPoint() {
      if (this.hover) {
        this.clicked = true;
        this.clickFunc();
        this.hover = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.click-point {
  width: 80px;
  height: 80px;
  margin: 100px 10vw;
  background-color: cadetblue;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  @include device-touch {
    width: 60px;
    height: 60px;
    margin: 0 20px;
  }
}

.hover {
  opacity: 0.8;
}

.clicked {
  background-color: orange;
  opacity: 1;
}
</style>
