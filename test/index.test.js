var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index'); // my express app
var should = chai.should();

chai.use(chaiHttp);

describe('API Tests', function() {

  describe('Tests of endpoints', function() {

    it.only('should list ALL the readings on GET', function(done) {
      chai.request(server)
        .get('/api/v1/')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
    });

    // the rest of the tests would continue here...

  });

});

