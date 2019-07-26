import { optionsActions, optionsMutations } from './const';

export default {
  [optionsActions.TOGGLE_OPTION]: ({ commit, state }, option) => {
    const obj = {
      val: !state.options[option],
      option,
    };
    commit(optionsMutations.SET_OPTION, obj);
  },
  [optionsActions.SET_OPTION]: ({ commit }, option) => {
    commit(optionsMutations.SET_OPTION, option);
  },
};
