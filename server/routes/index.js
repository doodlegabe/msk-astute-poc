require('dotenv').config('/../../.env');

const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch });

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'working'
  }));

  function checkVectorFile(dropboxEntry){
    console.log(dropboxEntry.name);
    console.log(dropboxEntry.path_lower);
    console.log(dropboxEntry.id);
    console.log(dropboxEntry.size);
  }

  function checkForSVG(dropboxEntries){
    for(let i=0; i<dropboxEntries.entries.length; i++){
      let fileName = dropboxEntries.entries[i].name.split('.');
      if(fileName[1] === 'svg'){
        checkVectorFile(dropboxEntries.entries[i]);
      }
    }
  }

  function checkDropBox(){
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        checkForSVG(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    setTimeout(checkDropBox, process.env.POLLING_TIMEOUT);
  }

  checkDropBox();

};


