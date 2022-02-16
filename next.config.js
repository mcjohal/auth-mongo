module.exports = {
  reactStrictMode: true,
};

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "mari",
        mongodb_password: "giniDelia1967",
        mongodb_clustername: "cluster0",
        mongodb_database: "authdb-dev",
      },
    };
  }

  return {
    env: {
      mongodb_username: "mari",
      mongodb_password: "giniDelia1967",
      mongodb_clustername: "cluster0",
      mongodb_database: "authdb",
      NEXTAUTH_URL: "https://auth-mongo.vercel.app",
    },
  };
};
