require('dotenv').config('../../.env');
const API_URL = require('./helpers/routing-helper').getAPIPath;
import mocks from './mocks';
const request = require('supertest')(API_URL);
import nock from 'nock'
const expect = require('chai').expect;
import vectorExamples from './mocks/example_json_svg'


describe('Creating, Reading, Updating, and Deleting Vector Files', function () {
  it('creates a Vector File from a valid post', function (done) {
    const aVectorFile = mocks.vectorFiles.createVectorFile();
    nock(API_URL)
      .post('/vector-file/create')
      .reply(201, aVectorFile);
    request
      .post('/vector-file/create')
      .send(
        {
          optimizedDate: new Date(),
          optimizedPath: '/optimized/drawing_optimized.svg',
          optimizedSVG: JSON.stringify(vectorExamples.json_svg_1),
          originalPath:'/drawing.svg',
          originalSVG: JSON.stringify(vectorExamples.json_svg_2),
        })
      .expect(201)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.id).to.equal(aVectorFile.id);
        done();
      })
  });

  it('lists all Vector Files', function (done) {
    const mockVectorFiles = mocks.vectorFiles.listVectorFiles();
    nock(API_URL)
      .get('/vector-files')
      .reply(200, mockVectorFiles.vectorFiles);
    request
      .get('/vector-files')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body[0].id).to.equal(mockVectorFiles.vectorFiles[0].id);
        done();
      })
  });

  it('retrieves a single Vector File', function (done) {
    const aVectorFile = mocks.vectorFiles.retrieveVectorFile();
    nock(API_URL)
      .get('/vector-file/1')
      .reply(200, aVectorFile);
    request
      .get('/vector-file/1')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.optimizedSVG).to.equal(aVectorFile.optimizedSVG);
        done();
      })
  });

  it('updates a single Vector File', function (done) {
    const aVectorFile = mocks.vectorFiles.updateVectorFile();
    nock(API_URL)
      .put('/vector-file/1')
      .reply(200, aVectorFile);
    request
      .put('/vector-file/1')
      .send(
        {
          first_name: aVectorFile.first_name
        }
        )
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.first_name).to.equal(aVectorFile.first_name);
        done();
      })
  });

  it('deletes a single Vector File', function (done) {
    nock(API_URL)
      .delete('/vectorFile/1')
      .reply(204);
    request
      .delete('/vectorFile/1')
      .send({id: 1})
      .expect(204)
      .end(function(){
        done();
      })
  });
});
