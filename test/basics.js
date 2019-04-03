require('dotenv').config('../../.env');
const API_URL = require('./helpers/routing-helper').getAPIPath;
import mocks from './mocks';
const request = require('supertest')(API_URL);
import nock from 'nock'
const expect = require('chai').expect;


describe('Basic routing', function () {
  it('replies to an unknown route', function (done) {
    const aResponse = mocks.basics.unknownRoute();
    nock(API_URL)
      .get('/well-this-is-unexpected')
      .reply(200, aResponse);
    request
      .get('/well-this-is-unexpected')
      .expect(200)
      .set('Accept', 'application/json')
      .end(function (err, res) {
        expect(res.body.message).to.equal(aResponse.message);
        done();
      })
  });
});