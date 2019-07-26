import Vue from 'vue';
import Vuex from 'vuex';

import packages from './package';
import options from './options';
import spinner from './spinner';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      package: packages,
      options,
      spinner,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return Store;
}
