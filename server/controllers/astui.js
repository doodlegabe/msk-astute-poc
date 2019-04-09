require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config('/../../.env');
const svgson = require('svgson');
const fs =require('fs');
const pretty = require('pretty');
const vectorFilesController = require('./vectors');

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
  clean(svgPath, svgJson, fileName){
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
        svgJson.children[0].children[0].attributes.d = res.path;
        const stringed = svgson.stringify(svgJson);
        const formatted = pretty(stringed);
        fs.writeFile(process.env.DROPBOX_LOCAL_PATH + '/optimized/'+fileName, formatted, function (err) {
          if (err){
            console.log(err);
            throw new Error({
              message:"Saving Error",
              status:err
            });
          }
          vectorFilesController.temp({dropboxId:'foo'});
        });
      })
  }
};
