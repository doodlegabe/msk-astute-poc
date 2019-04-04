require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config('/../../.env');

module.exports = {
  authenticate(){
    fetch('https://astui.tech/api/v1/validate', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        api_token: process.env.ASTUI_ACCESS_TOKEN
      })
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error({
            message:"Error from Astui Service",
            status:response.status
          });
        }
        return response.json();
      })
      .then(function(res) {
        if(res.message === "Authenticated" && res.status ===200){
          return true;
        }
      });
  },
  clean(svgPath){
    fetch('https://astui.tech/api/v1/spr', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        api_token: process.env.ASTUI_ACCESS_TOKEN,
        path: svgPath
      })
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error({
            message:"Error from Astui Service",
            status:response.status
          });
        }
        return response.json();
      })
      .then(function(res) {
        console.log('from astui');
        console.log(res);
      });
  }
};
