var request = require('supertest');
var should = require('should');
var qs = require('querystring');

describe('API', function(){
  before(function(done){
    this.api = require('../examples/rest-api');
    done();
  });
  it('should be ok(200) at search(/search)', function(done){
    request(this.api)
      .get('/search')
      .expect(200)
      .end(function(error, response){
        response.body.results.should.be.an.Array;
        response.body.results.should.be.empty;
        done(); 
      });
  });
  it('should be show query results when request', function(done){
    var query = qs.stringify({q:'primus'});
    request(this.api)
      .get('/search?'+query)
      .expect(200)
      .end(function(error, response){
        response.body.results.should.be.an.Array;
        response.body.results.should.not.be.empty;
        done();
      });
  });

  it('should show next pages of results', function(done){
    var query = qs.stringify({q:'primus', page:'2'});
    request(this.api)
      .get('/search?'+query)
      .expect(200)
      .end(function(error, response){
        response.body.results.should.be.an.Array;
        response.body.results.should.not.be.empty;
        done();
      });
  });

});