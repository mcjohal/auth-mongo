module.exports = {
  reactStrictMode: true,
}


const {PHASE_DEVELOPMENT_SERVER} = require('next/constants');


module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER){
    return{
      env: {
        mongodb_username:'mari',
        mongodb_password: 'giniDelia1967',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'user-auth-dev'
    },
    }
  }

  return{
        env: {
          mongodb_username:'mari',
          mongodb_password: 'giniDelia1967',
          mongodb_clustername: 'cluster0',
          mongodb_database: 'user-auth',
          NEXTAUTH_URL: "https://user-auth.vercel.app",
      },
  };  
};