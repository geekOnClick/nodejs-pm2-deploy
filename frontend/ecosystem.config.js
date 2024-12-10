require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [{
    name: 'frontend-pm2',
    script: 'serve',
    args: '-s build -p 7000'
  }],

  deploy: {
    production: {
      key: 'C:\\\\Users\\\\Alex\\\\.ssh\\\\praktikum-ubuntu.pem',
      user: process.env.REMOTE_USER,
      host: process.env.REMOTE_HOST,
      ref: process.env.REF,
      repo: process.env.REPO,
      path: process.env.REMOTE_PATH,
      'post-deploy': 'cd frontend && npm i && npm run build && npm i -g serve && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
