let config;
const formSetting = [
  {
    type: 'npm',
    data: [
      { option: 'deps', label: 'deps', defaultVal: true },
      { option: 'devDeps', label: 'devDeps', defaultVal: true },
      { option: 'peerDeps', label: 'peerDeps', defaultVal: true },
      { option: 'yarnLock', label: 'yarn.lock', defaultVal: true },
      { option: 'packageLock', label: 'package-lock.json', defaultVal: true },
    ],
  }, {
    type: 'node',
    data: [
      { option: 'nvm', label: '.nvmrc', defaultVal: true },
      { option: 'package', label: 'package.json', defaultVal: true },
      { option: 'engines', label: 'engines', defaultVal: true },
    ],
  },
];

const ARRAY_FIELDS = ['packageLockVersion', 'yarnLockVersion'];

if (process.env.NODE_ENV === 'production') {
  config = {
    githubClientId: '8b20e17f2c8c05c29536',
    githubAuthUrl: 'https://github.com/login/oauth/authorize',
    githubGrtUrl: 'https://grt-api.herokuapp.com/api/grt',
    githubTokenUrl: 'https://grt-api.herokuapp.com/api/token',
    formSetting,
    ARRAY_FIELDS,
  };
} else {
  config = {
    githubClientId: '8b20e17f2c8c05c29536',
    githubAuthUrl: 'https://github.com/login/oauth/authorize',
    githubGrtUrl: 'https://grt-api.herokuapp.com/api/grt',
    githubUrl: 'https://grt-api.herokuapp.com/api',
    githubTokenUrl: 'https://grt-api.herokuapp.com/api/token',
    formSetting,
    ARRAY_FIELDS,
  };
}

export default async ({ Vue }) => {
  Vue.prototype.$config = config;
};
