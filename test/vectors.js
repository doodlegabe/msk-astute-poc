require('dotenv').config('../../.env');
const API_URL = require('./helpers/routing-helper').getAPIPath;
import mocks from './mocks';
const request = require('supertest')(API_URL);
import nock from 'nock'
const expect = require('chai').expect;
import vectorExamples from './mocks/example_json_svg'


describe('Creating, Reading, Updating, and Deleting Vector Files', function () {
  it('creates a Vector File from a valid post', function (done) {
    const aVectorFile = mocks.vectors.createVector();
    nock(API_URL)
      .post('/vector/create')
      .reply(201, aVectorFile);
    request
      .post('/vector/create')
      .send(
        {
          optimizedDate: new Date(),
          optimizedPath: '/optimized/drawing_optimized.svg',
          optimizedSVG: JSON.stringify(vectorExamples.json_svg_1),
          originalPath:'/drawing.svg',
          originalSVG: JSON.stringify(vectorExamples.json_svg_2),
          dropboxId: '1234'
        })
      .expect(201)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.id).to.equal(aVectorFile.id);
        done();
      })
  });

  it('lists all Vector Files', function (done) {
    const mockVectorFiles = mocks.vectors.listVectors();
    nock(API_URL)
      .get('/vectors')
      .reply(200, mockVectorFiles.vectors);
    request
      .get('/vectors')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body[0].id).to.equal(mockVectorFiles.vectors[0].id);
        done();
      })
  });

  it('retrieves a single Vector File', function (done) {
    const aVectorFile = mocks.vectors.retrieveVector();
    nock(API_URL)
      .get('/vector/1')
      .reply(200, aVectorFile);
    request
      .get('/vector/1')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.optimizedSVG).to.equal(aVectorFile.optimizedSVG);
        done();
      })
  });

  it('retrieves a Vector File by Dropbox ID', function(done){
    const aVectorFile = mocks.vectors.retrieveVector();
    nock(API_URL)
      .get('/vector/1')
      .reply(200, aVectorFile);
    request
      .get('/vector/1')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.dropboxId).to.equal(aVectorFile.dropboxId);
        done();
      })
  });

  it('creates a new Vector File with a new Dropbox ID', function(done){
    const aVectorFile = mocks.vectors.newDropboxID();
    nock(API_URL)
      .get('/vector/1')
      .reply(200, aVectorFile);
    request
      .get('/vector/1')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.dropboxId).to.equal(aVectorFile.dropboxId);
        done();
      })
  });

  it('updates a single Vector File', function (done) {
    const aVectorFile = mocks.vectors.updateVector();
    nock(API_URL)
      .put('/vector/1')
      .reply(200, aVectorFile);
    request
      .put('/vector/1')
      .send(
        {
          optimizedSVG: JSON.stringify(vectorExamples.json_svg_1_updated)
        }
        )
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.optimizedSVG).to.equal(aVectorFile.optimizedSVG);
        done();
      })
  });

  it('deletes a single Vector File', function (done) {
    nock(API_URL)
      .delete('/vector/1')
      .reply(204);
    request
      .delete('/vector/1')
      .send({id: 1})
      .expect(204)
      .end(function(){
        done();
      })
  });
});
