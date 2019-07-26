<template>
  <div>
    <q-checkbox
      :val="options[option]"
      :value="options[option]"
      :label="label"
      @input="toggle"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { optionsActions } from '../../store/options/const';

export default {
  name: 'CheckOption',
  props: {
    option: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    defaultVal: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    ...mapState({
      options: state => state.options.options,
    }),
  },
  mounted() {
    this.$store.dispatch(`options/${optionsActions.SET_OPTION}`, {
      option: this.option,
      val: this.defaultVal,
    });
  },
  methods: {
    toggle() {
      this.$store.dispatch(`options/${optionsActions.TOGGLE_OPTION}`, this.option);
    },
  },
};
</script>

<style>
</style>
