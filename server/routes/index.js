require('dotenv').config('/../../.env');
const astuiController = require('../controllers').astui;
const vectorController = require('../controllers').vectors;
const fetch = require('isomorphic-fetch');
const Dropbox = require('dropbox').Dropbox;
const dbx = new Dropbox({accessToken: process.env.DROPBOX_ACCESS_TOKEN, fetch: fetch});
const svgson = require('svgson');
const toPath = require('element-to-path');
const fs = require('fs');
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
  app.post('/api/vector/update', vectorController.update);
  app.delete('/api/vector/:id', vectorController.destroy);

  //Astui Interface
  app.post('/api/astui/clean', astuiController.clean);

  function processVector(vectorRecord, dropboxEntry) {
    fs.readFile(process.env.DROPBOX_LOCAL_PATH + vectorRecord.originalPath, 'utf-8', function (err, data) {
      svgson
        .parse(data)
        .then(function (parsedJson) {
          const optimizeData = {
            svgPath: toPath(parsedJson.children[0].children[0]),
            svgJson: JSON.stringify(parsedJson),
            fileName: dropboxEntry.name
          };
          request
            .post({
              url: pathHelper.getAPIPath + '/api/astui/clean',
              form: optimizeData
            }, function (cleanErr, cleanHttpResponse, cleanBody) {
              if (cleanErr) {
                return console.error('Vector clean up failed:', cleanErr);
              }
              if (cleanHttpResponse.statusCode === 200) {
                const cleanedResponse = JSON.parse(cleanBody);
                if (cleanedResponse.success) {
                  // now update the record with the optimized info and stamp the optimized date
                  const stichedUpRecord = {
                    id: vectorRecord.id,
                    optimizedDate: new Date(),
                    optimizedPath: cleanedResponse.optimizedFilePath,
                    optimizedSVG: cleanedResponse.optimizedSVG,
                  };
                  request
                    .post({
                      url: pathHelper.getAPIPath + '/api/vector/update',
                      form: stichedUpRecord
                    }, function (updateErr, updateHttpResponse, updateBody) {
                      if (updateErr) {
                        return console.error('Failed to update vector record:', updateErr);
                      }
                      if (updateHttpResponse.statusCode === 200) {
                        const updateResponse = JSON.parse(updateBody);
                        if (updateResponse.success) {
                          console.log('Optimization completed', updateResponse);
                        }
                      }
                    })
                  }
                }
              });
          });
        });
      }

  function checkDropboxId(dropboxEntry) {
    request
      .get(pathHelper.getAPIPath + '/api/vector-dropbox/', {form: {dropboxId: dropboxEntry.id}}, function (dboxErr, dboxHttpResponse, dboxBody) {
        if (dboxErr) {
          return console.error('Dropbox File look up failed:', dboxErr);
        }
        if (dboxHttpResponse.statusCode === 200) {
          let dropboxIdCheck = JSON.parse(dboxBody);
            if (dropboxIdCheck.found === false) {
              //then json the original vector
              fs.readFile(process.env.DROPBOX_LOCAL_PATH + dropboxEntry.path_lower, 'utf-8', function (orgParseErr, orgParseData) {
                    if(orgParseErr) throw orgParseErr;
                    const newVector = {
                      originalPath: dropboxEntry.path_lower,
                      originalSVG: orgParseData,
                      dropboxId: dropboxEntry.id
                    };
                    request
                      .post({
                        url: pathHelper.getAPIPath + '/api/vector/create',
                        form: newVector
                      }, function (createVectorErr, createVectorHttpResponse, createVectorBody) {
                        if (createVectorErr) {
                          return console.error('Vector record creation error:', createVectorErr);
                        }
                        if (createVectorHttpResponse.statusCode === 201) {
                          const newVectorRecord = JSON.parse(createVectorBody);
                          processVector(newVectorRecord, dropboxEntry);
                        }
                      });
                  });;
            } else {
              dropboxIdCheck = dropboxIdCheck[0];
              // check for an optimize path - if null try to optimize otherwise
              if (!dropboxIdCheck.optimizedDate) {
                processVector(dropboxIdCheck, dropboxEntry);
              } else {
                //compare the timestamps of the dropbox file and the record\'s optimize date;
                const optDate = new Date(dropboxIdCheck.optimizedDate);
                const upDate = new Date(dropboxIdCheck.updatedAt);
                //compare the timestamps of the dropbox file and the record's optimize date
                //if the optimize date is after then do nothing
                if (upDate > optDate) {
                  // if the optimize date is before then optimize
                  processVector(dropboxIdCheck, dropboxEntry);
                }
              }
            }
        }
      });
    }

  function checkForSVG(dropboxEntries) {
    for (let i = 0; i < dropboxEntries.entries.length; i++) {
      let fileName = dropboxEntries.entries[i].name.split('.');
      if (fileName[1] === 'svg') {
        checkDropboxId(dropboxEntries.entries[i]);
      }
    }
  }

  function checkDropbox() {
    dbx.filesListFolder({path: ''})
      .then(function (response) {
        checkForSVG(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTimeout(checkDropbox, process.env.POLLING_TIMEOUT);
  }

  checkDropbox();
};


