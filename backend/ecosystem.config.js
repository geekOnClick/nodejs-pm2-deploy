require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [{
    name: 'backend-pm2',
    script: 'npm',
    args: 'run start',
  }],

  deploy: {
    production: {
      key: 'C:\\\\Users\\\\Alex\\\\.ssh\\\\praktikum-ubuntu.pem',
      user: process.env.REMOTE_USER,
      host: process.env.REMOTE_HOST,
      ref: process.env.REF,
      repo: process.env.REPO,
      path: process.env.REMOTE_PATH,
      'pre-deploy-local': `scp -i C:/Users/Alex/.ssh/praktikum-ubuntu.pem ./.env ${process.env.REMOTE_USER}@${process.env.REMOTE_HOST}:${process.env.REMOTE_PATH}/current/backend`,
      'post-deploy': 'cd backend && npm i && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
