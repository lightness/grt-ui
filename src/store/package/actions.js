import { packageActions, packageMutations } from './const';
import { GrtService } from '../../services/grt';
import { spinnerActions } from '../spinner/constants';

export default {
  [packageActions.GET_PACKAGES]: async ({ commit, dispatch }, options) => {
    dispatch(`spinner/${spinnerActions.START}`, null, { root: true });
    const res = await GrtService.getPackages(options.url, options.data);
    commit(packageMutations.SET_PACKAGES, res.data);
    dispatch(`spinner/${spinnerActions.STOP}`, null, { root: true });
  },
};
