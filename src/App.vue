<template>
  <div id="q-app">
    <s-default-layout>
      <s-main-form/>
      <s-packages-table/>
      <div class="s-spinner" v-if="isSpinnerActive">
        <q-spinner size="5rem" color="blue"/>
      </div>
    </s-default-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DefaultLayout from 'layouts/DefaultLayout';
import MainForm from 'components/main-form/MainForm';
import PackagesTable from './components/packages-table/PackagesTable';

export default {
  name: 'App',
  components: {
    's-default-layout': DefaultLayout,
    's-main-form': MainForm,
    's-packages-table': PackagesTable,
  },
  computed: {
    ...mapState({
      isSpinnerActive: state => state.spinner.isActive,
    }),
  },
};
</script>

<style>
  .text-left {
    white-space: pre !important;
  }

  .s-spinner {
    position: fixed;
    z-index: 2;
    height: 2em;
    width: 2em;
    overflow: visible;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .s-spinner:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
  }
</style>
