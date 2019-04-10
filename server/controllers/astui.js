require('dotenv').config('/../../.env');
const request = require('request');
const svgson = require('svgson');
const fs =require('fs');
const pretty = require('pretty');

module.exports = {
  clean(req, res) {
    const svgJson = JSON.parse(req.body.svgJson);
    request
      .post({
        url: 'https://astui.tech/api/v1/spr',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        form: {
          api_token: process.env.ASTUI_ACCESS_TOKEN,
          path: req.body.svgPath
        }
      }, function (err, httpResponse, body) {
        if (err) {
          return console.error('Failed to optimize via Astui:', err);
        }
        if (httpResponse.statusCode === 200) {
          const optimizedResponse = JSON.parse(body);
          svgJson.children[0].children[0].attributes.d = optimizedResponse.path;
          const stringed = svgson.stringify(svgJson);
          const formatted = pretty(stringed);
          fs.writeFile(process.env.DROPBOX_LOCAL_PATH + '/optimized/'+ req.body.fileName, formatted, function (parseErr) {
            if (parseErr){
              throw new Error({
                message:"Saving Error",
                status:parseErr
              });
            }
            const successfulParseResponse = {
              success: true,
              optimizedFilePath: '/optimized/'+req.body.fileName,
              optimizedSVG: formatted
            };
            console.log(successfulParseResponse);
            res.status(200).send(JSON.stringify(successfulParseResponse));
          });
        }
      });
  }

};
