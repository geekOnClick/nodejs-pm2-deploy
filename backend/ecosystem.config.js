require('dotenv').config({ path: '.env.deploy' });

module.exports = {
  apps: [{
    name: 'backend',
    script: 'npm',
    args: 'run start',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],

  deploy: {
    production: {
      key: '../../private.pem',
      user: process.env.REMOTE_USER,
      host: process.env.REMOTE_HOST,
      ref: 'origin/master',
      repo: process.env.REPO,
      path: process.env.REMOTE_PATH,
      'pre-setup': 'apt-get install git ; ls -la',
      'post-setup': 'ls -la',
      'post-deploy': `npm install && pm2 reload ecosystem.config.js --env production && scp .env.production ${process.env.REMOTE_USER}@${process.env.REMOTE_HOST}:${process.env.REMOTE_PATH}`,
    },
  },
};