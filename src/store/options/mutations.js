import { optionsMutations } from './const';

export default {
  [optionsMutations.SET_OPTION](state, obj) {
    state.options = { ...state.options, [obj.option]: obj.val };
  },
};
