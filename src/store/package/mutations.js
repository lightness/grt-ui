import { packageMutations } from './const';

export default {
  [packageMutations.SET_PACKAGES]: (state, packages) => {
    state.packages = packages;
  },
};
