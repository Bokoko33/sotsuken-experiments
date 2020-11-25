<template>
  <div ref="item" class="quest-item">
    <div class="quest-item__num" :class="{ hover: hover, selected: selected }">
      {{ radio.id }}
    </div>
    <div class="quest-item__text">{{ radio.text }}</div>
  </div>
</template>

<script>
export default {
  props: {
    radio: {
      type: Object,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
    selectFunc: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      element: null,
      hover: false,
      width: 0,
      height: 0,
      pos: {
        x: 0,
        y: 0,
      },
      animId: 0,
    };
  },
  computed: {
    selected() {
      return this.radio.id === this.selectedId;
    },
  },
  mounted() {
    this.initTransform();
    this.clickEventInit();
    this.collider();
    window.addEventListener('resize', this.initTransform);
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animId);
    this.$interFace.removeEvent(this.clickItem);
    window.removeEventListener('resize', this.initTransform);
  },
  methods: {
    initTransform() {
      this.element = this.$refs.item;
      // 大きさを参照
      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      // 座標をcssから参照して格納
      const clientRect = this.element.getBoundingClientRect();
      this.pos.x = clientRect.left;
      this.pos.y = clientRect.top;
    },
    clickEventInit() {
      this.$interFace.addEvent(this.clickItem);
    },
    collider() {
      // クリック済みになるまで検知し続ける
      this.animId = requestAnimationFrame(this.collider);

      this.hover = this.$interFace.onTriggerEnter(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      );
    },
    clickItem() {
      if (this.hover) {
        this.selectFunc(this.radio.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.quest-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @include device-touch {
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
}

.quest-item__num {
  width: 60px;
  height: 60px;
  background-color: white;
  border-radius: 50%;
  border: solid 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  @include device-touch {
    width: 40px;
    height: 40px;
    margin-right: 20px;
  }
}

.quest-item__text {
  text-align: center;
  margin-top: 10px;
  @include device-touch {
    text-align: left;
    margin-top: 0;
  }
}

.hover {
  border: solid 1px orange;
}

.selected {
  border: solid 1px orange;
  background-color: orange;
  color: white;
}
</style>
