import Vue from 'vue';
import style from '~/assets/scss/base/_variable.scss';

class InterFace {
  constructor() {
    this.windowSize = { w: window.innerWidth, h: window.innerHeight };
    this.cursor = document.getElementById('cursor');
    this.trackpad = document.getElementById('trackpad');
    // 入力座標
    this.inputPos = { x: 20, y: 20 }; // 見えやすい初期値

    // カーソルの描画座標
    this.cursorPos = { x: 10, y: 10 };

    // トラックパッド内の座標
    this.trackPos = { x: 0, y: 0 };

    // ドラッグ中か
    this.isDrag = false;

    // トラックパッド感度（1で完全に同距離）
    this.sensitivity = 3;

    this.breakPoint = Number(style.breakPointTablet.replace('px', ''));

    // クリックイベントを配列で持っておく
    this.clickEventList = [];

    this.forceList = [
      1,
      0.5,
      0.25,
      0.1,
      0.075,
      0.05,
      0.025,
      0.01,
      0.0075,
      0.005,
    ];

    this.forcePattern = Math.floor(Math.random() * 3); // 抗力提示のパターン0,1,2
    this.forceIndex = 0; // 現在の抗力インデックス
    this.forceEqualInterval = [
      [0.2, 0.7, 0.3, 0.6, 0.5, 0.9, 0.4, 0.1, 0.8],
      [0.3, 0.8, 0.9, 0.4, 0.6, 0.2, 0.1, 0.5, 0.7],
      [0.8, 0.4, 0.1, 0.7, 0.5, 0.2, 0.9, 0.6, 0.3],
    ];

    // 抵抗値（小さいほど強い抵抗)
    this.force = 1;

    // リサイズイベント登録
    window.addEventListener('resize', this.resize.bind(this));

    this.cursorInit();
    this.trackPadInit();
  }

  cursorInit() {
    window.addEventListener('mousemove', (e) => {
      this.mouseMoved(e);
    });
    document.body.addEventListener('click', (e) => {
      this.handleEventList();
    });
  }

  mouseMoved(e) {
    // スマホ時は実行しない
    if (this.windowSize.w < this.breakPoint) return;
    this.inputPos.x = e.clientX;
    this.inputPos.y = e.clientY;
  }

  trackPadInit() {
    // トラックパッド操作時のイベントを登録
    this.trackpad.addEventListener('touchstart', (e) => {
      // マウスダウンでドラッグ開始、現在の座標をprevに格納
      this.isDrag = true;
      this.trackPos.x = e.touches[0].clientX;
      this.trackPos.y = e.touches[0].clientY;

      if (this.hover) this.isTouchedObj = true;
    });
    this.trackpad.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (this.isDrag) {
        this.trackPadMoved(e);
      }
    });
    this.trackpad.addEventListener('touchend', (e) => {
      if (this.isDrag) {
        this.isDrag = false;
      }
      this.isTouchedObj = false;
    });
    this.trackpad.addEventListener('click', (e) => {
      this.handleEventList();
    });
  }

  trackPadMoved(e) {
    // 移動量を求める
    const moveX = e.touches[0].clientX - this.trackPos.x;
    const moveY = e.touches[0].clientY - this.trackPos.y;

    // 入力座標に移動量を加える
    this.inputPos.x += moveX * this.sensitivity;
    this.inputPos.y += moveY * this.sensitivity;

    // 現在のトラックパッド座標をセット
    this.trackPos.x = e.touches[0].clientX;
    this.trackPos.y = e.touches[0].clientY;
  }

  update() {
    // 慣性の処理
    this.cursorPos.x += (this.inputPos.x - this.cursorPos.x) * this.force;
    this.cursorPos.y += (this.inputPos.y - this.cursorPos.y) * this.force;

    // 画面端から見切れない処理
    if (this.cursorPos.x < 0) {
      this.cursorPos.x = 0;
    }
    if (this.cursorPos.x > this.windowSize.w) {
      this.cursorPos.x = this.windowSize.w;
    }
    if (this.cursorPos.y < 0) {
      this.cursorPos.y = 0;
    }
    if (this.cursorPos.y > this.windowSize.h) {
      this.cursorPos.y = this.windowSize.h;
    }

    // カーソルに座標を適用
    this.cursor.style.transform =
      'translate(' + this.cursorPos.x + 'px, ' + this.cursorPos.y + 'px)';
  }

  resize() {
    this.windowSize.w = window.innerWidth;
    this.windowSize.h = window.innerHeight;
  }

  addEvent(callback) {
    this.clickEventList.push(callback);
  }

  removeEvent(callback) {
    const index = this.clickEventList.indexOf(callback);
    if (index > -1) {
      this.clickEventList.splice(index, 1);
    }
  }

  handleEventList() {
    // リスト内のメソッドを実行。これをaddEventListenerで紐付けている
    for (let i = 0; i < this.clickEventList.length; i++) {
      this.clickEventList[i]();
    }
  }

  changeForce() {
    this.force = this.forceEqualInterval[this.forcePattern][this.forceIndex];
    this.forceIndex++;
  }

  setDefaultForce() {
    this.force = 1;
  }

  onTriggerEnter(x, y, width, height) {
    if (
      this.cursorPos.x > x &&
      this.cursorPos.x < x + width &&
      this.cursorPos.y > y &&
      this.cursorPos.y < y + height
    ) {
      return true;
    } else {
      return false;
    }
  }
}

Vue.prototype.$interFace = new InterFace();
