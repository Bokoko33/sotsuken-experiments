<template>
  <div ref="link" :class="{ hover: hover, disabled: disabled }" class="link">
    次へ
  </div>
</template>

<script>
export default {
  props: {
    nextPath: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    clickFunc: {
      type: Function,
      required: false,
      default: null,
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
  mounted() {
    this.initTransform();
    this.clickEventInit();
    this.collider();
    window.addEventListener('resize', this.initTransform);
  },
  beforeDestroy() {
    this.$interFace.removeEvent(this.clickLink);
    window.removeEventListener('resize', this.initTransform);
  },
  methods: {
    initTransform() {
      this.element = this.$refs.link;
      // 大きさを参照
      this.width = this.element.clientWidth;
      this.height = this.element.clientHeight;
      // 座標をcssから参照して格納
      const clientRect = this.element.getBoundingClientRect();
      this.pos.x = clientRect.left;
      this.pos.y = clientRect.top;
    },
    clickEventInit() {
      this.$interFace.addEvent(this.clickLink);
    },
    collider() {
      // クリック済みになるまで検知し続ける
      this.animId = requestAnimationFrame(this.collider);

      if (this.disabled) return;

      this.hover = this.$interFace.onTriggerEnter(
        this.pos.x,
        this.pos.y,
        this.width,
        this.height
      );
    },
    clickLink() {
      if (this.hover) {
        // アンケート時は回答用の関数を実行
        if (this.clickFunc) this.clickFunc();

        if (this.$route.name === 'normal') {
          // ノーマルカーソル提示ページでのクリックでは抗力変更
          this.$interFace.changeForce(this.$store.state.expNumber - 1);
        } else {
          // それ以外の実験ページでのクリックはカウントアップと抗力リセット
          this.$store.commit('addExpNumber');
          this.$interFace.setDefaultForce();
        }

        cancelAnimationFrame(this.animId);
        this.$router.push(this.nextPath);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 60px;
  border: solid 1px orange;
  color: orange;
  border-radius: 6px;
}

.hover {
  color: white;
  background-color: orange;
}

.disabled {
  opacity: 0.5;
}
</style>
