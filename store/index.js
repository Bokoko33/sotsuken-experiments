import style from '~/assets/scss/base/_variable.scss';

const totalExpNum = 9;
const questAnswer = [];
for (let i = 0; i < totalExpNum; i++) {
  questAnswer[i] = 999; // 初期値
}

export const state = () => ({
  breakPoint: Number(style.breakPointTablet.replace('px', '')),
  defaultMouseSpeed: -1,
  totalExpNum,
  questAnswer,
  expNumber: 1,
});

export const mutations = {
  setDefaultMouseSpeed(state, value) {
    state.defaultMouseSpeed = value;
  },
  addExpNumber(state) {
    if (state.expNumber < state.totalExpNum) state.expNumber++;
  },
  setAnswer(state, id) {
    // spだと最後だけ謎に二回呼ばれるのでそれの回避
    if (state.expNumber > state.totalExpNum) return;
    state.questAnswer[state.expNumber - 1] = id;
  },
};
