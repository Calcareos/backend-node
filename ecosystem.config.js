module.exports = {
  apps: [{
    name: "BASE-NODE",
    script: "./index.js",
    instances: 8,
    env: {
      NODE_ENV: "development",
    },
    env_test: {
      NODE_ENV: "test",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}