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
        mongodb_database: "jtech",
        NEXTAUTH_URL: "http://localhost:3000/",
      },
    };
  }

  return {
    env: {
      mongodb_username: "mari",
      mongodb_password: "giniDelia1967",
      mongodb_clustername: "cluster0",
      mongodb_database: "jtech",
      NEXTAUTH_URL: "https://j28tech.vercel.app",
    },
  };
};
