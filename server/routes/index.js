require('dotenv').config('/../../.env');
const astuiController = require('../controllers').astui;
const vectorController = require('../controllers').vectors;
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch });
const svgson = require('svgson');
const toPath = require('element-to-path');
const fs =require('fs');
const request = require('request');
const pathHelper = require('../../test/helpers/routing-helper');

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'working'
  }));

  //Vector Files
  app.post('/api/vector/create', vectorController.create);
  app.get('/api/vectors', vectorController.list);
  app.get('/api/vector/:id', vectorController.retrieve);
  app.get('/api/vector-dropbox/', vectorController.retrieveOrCreateByDropboxId);
  app.put('/api/vector/:id', vectorController.update);
  app.delete('/api/vector/:id', vectorController.destroy);

  function processVector(dropboxEntry){
    fs.readFile(process.env.DROPBOX_LOCAL_PATH + dropboxEntry.path_lower, 'utf-8', function(err, data) {
      svgson
        .parse(data)
        .then(function(json) {
          astuiController.clean(toPath(json.children[0].children[0]),json, dropboxEntry.name)
        });
    });
  }

  function checkDropboxId(dropboxEntry){
    request
      .get(pathHelper.getAPIPath + '/api/vector-dropbox/', {form:{dropboxId:dropboxEntry.id}}, function(err,httpResponse,body){
        if (err) {
          return console.error('Dropbox File look up failed:', err);
        }
        console.log(httpResponse.statusCode);
        if(httpResponse.statusCode === 200){
          const dropboxIdCheck = JSON.parse(body);
          if(dropboxIdCheck.found === false){

          }
        }
      });
    //processVector(dropboxEntry);
  }

  function checkForSVG(dropboxEntries){
    for(let i=0; i<dropboxEntries.entries.length; i++){
      let fileName = dropboxEntries.entries[i].name.split('.');
      if(fileName[1] === 'svg'){
        checkDropboxId(dropboxEntries.entries[i]);
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


