require('dotenv').config('/../../.env');
const astuiController = require('../controllers').astui;
const vectorFilesController = require('../controllers').vectorFiles;
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch });
const svgson = require('svgson');
const toPath = require('element-to-path');
const fs =require('fs');

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'working'
  }));

  function processVector(dropboxEntry){
    fs.readFile(process.env.DROPBOX_LOCAL_PATH + dropboxEntry.path_lower, 'utf-8', function(err, data) {
      svgson
        .parse(data)
        .then(function(json) {
          astuiController.clean(toPath(json.children[0].children[0]),json, dropboxEntry.name);
        });
    });
  }

  function checkForSVG(dropboxEntries){
    for(let i=0; i<dropboxEntries.entries.length; i++){
      let fileName = dropboxEntries.entries[i].name.split('.');
      if(fileName[1] === 'svg'){
        processVector(dropboxEntries.entries[i]);
      }
    }
  }

  function checkDropbox(){
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        checkForSVG(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(checkDropbox, process.env.POLLING_TIMEOUT);
  }

  checkDropbox();
};


