<template>
  <div class="q-pa-md">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <div class="text-h2">Search place</div>
      <div class="row">
        <div class="col flex items-center">
          <q-radio v-model="place" val="user" label="User" />
        </div>
        <div class="col">
          <q-input
            v-model="user"
            ref="userInput"
            label="Username"
            :disable="isOrg"
          />
        </div>
      </div>
      <div class="row">
        <div class="col flex items-center">
          <q-radio v-model="place" val="org" label="Organization" />
        </div>
        <div class="col">
          <q-input
            v-model="org"
            ref="orgInput"
            label="Organization"
            :disable="!isOrg"
          />
        </div>
      </div>
      <div class="text-h2">Search type</div>
      <div class="row">
        <div class="col flex items-center">
          <q-radio v-model="type" val="npm" label="NPM package version" />
        </div>
        <div class="col">
          <q-input
            v-model="pkgVersion"
            ref="input"
            label="Version"
            :rules="[ (val) => pkgVersionRule(val) || 'Please type something']"
            :disable="isNode"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-radio v-model="type" val="node" label="Node version" />
        </div>
      </div>
      <q-card bordered>
        <q-card-section>
          <div class="text-h6">Options</div>
        </q-card-section>
        <q-separator inset />
        <q-card-section>
          <div class="row">
            <div class="col-6" v-for="item in optionList" :key="item.val">
              <s-check-option
                :option="item.option"
                :label="item.label"
                :defaultVal="item.defaultVal"
                :key="isNode"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckOption from '../check-option/CheckOption';
import { packageActions } from '../../store/package/const';
import { StorageService } from '../../services/storage';

export default {
  name: 'MainForm',
  components: {
    's-check-option': CheckOption,
  },
  data() {
    return {
      type: 'npm',
      place: 'user',
      user: '',
      org: '',
      pkgVersion: '',
    };
  },
  computed: {
    isNode() {
      return this.type === 'node';
    },
    isOrg() {
      return this.place === 'org';
    },
    optionList() {
      const setting = this.$config.formSetting.find(t => t.type === this.type);

      return setting ? setting.data : [];
    },
    ...mapState({
      options: state => state.options.options,
    }),
  },
  methods: {
    pkgVersionRule(val) {
      if (this.isNode) {
        return true;
      }

      return val && val.length > 0;
    },
    onSubmit() {
      const token = StorageService.getToken();
      let typeOptions;

      if (this.isNode) {
        typeOptions = {
          node: true,
        };
      } else {
        typeOptions = {
          package: this.pkgVersion,
        };
      }

      const data = {
        ...this.options,
        ...typeOptions,
        [this.place]: this[this.place],
        token,
      };

      this.$store.dispatch(`package/${packageActions.GET_PACKAGES}`, {
        url: this.$config.githubGrtUrl,
        data,
      });
    },
  },
  watch: {
    type() {
      this.pkgVersion = '';
      this.$refs.input.resetValidation();
    },
    place() {
      this.user = '';
      this.org = '';
    },
  },
};
</script>

<style>
  .q-pa-md {
    width: 100%;
    max-width: 80%;
  }

  @media screen and (max-width: 768px) {
    .q-pa-md {
      max-width: 100%;
    }
  }
</style>
