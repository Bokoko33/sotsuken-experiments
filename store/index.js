import style from '~/assets/scss/base/_variable.scss';

const totalExpNum = 9;
const questAnswer = [];
for (let i = 0; i < totalExpNum; i++) {
  questAnswer[i] = -1;
}

export const state = () => ({
  breakPoint: Number(style.breakPointTablet.replace('px', '')),
  totalExpNum,
  questAnswer,
  expNumber: 0,
});

export const mutations = {
  addExpNumber(state) {
    state.expNumber++;
  },
  setAnswer(state, id) {
    state.questAnswer[state.expNumber - 1] = id;
  },
};
