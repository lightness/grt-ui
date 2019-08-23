<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Github Repo Tools</q-toolbar-title>
        <q-item
          tag="a"
          href="https://github.com/lightness/github-repo-tools"
          target="_blank"
          class="items-center"
        >
          <q-icon name="fab fa-github" />
        </q-item>
      </q-toolbar>
    </q-header>
    <q-page-container class="flex justify-center column items-center">
      <slot/>
    </q-page-container>
  </q-layout>
</template>

<script>
import querystring from 'querystring';
import { GrtService } from '../services/grt';
import { StorageService } from '../services/storage';

const REDIRECT_URL = window.location.origin;
const SCOPE = 'repo';
const LS_KEY = 'token';

export default {
  name: 'DefaultLayout',
  methods: {
    navigateToGithubAuth() {
      const query = {
        client_id: this.$config.githubClientId,
        redirect_uri: REDIRECT_URL,
        scope: SCOPE,
      };
      const queryStr = querystring.stringify(query);

      window.location.href = `${this.$config.githubAuthUrl}?${queryStr}`;
    },
  },
  mounted() {
    if (window.location.search.indexOf('code=') > -1) {
      const { code, ...rest } = querystring.parse(window.location.search.slice(1));

      GrtService.authenticate(this.$config.githubTokenUrl, { code }).then((res) => {
        StorageService.setToken(res.data.access_token);
        window.location.search = querystring.stringify(rest);
      })
        .catch((err) => {
          document.body = JSON.stringify(err);
        });
    } else {
      const token = localStorage.getItem(LS_KEY);
      if (!token) {
        this.navigateToGithubAuth();
      }
    }
  },
};
</script>

<style>
</style>
