const app = require('../server')

const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
const should = chai.should()

chai.use(chaiHttp);
describe("Server!", () => {
  // Login User
  it("Login User Test", done => {
    const user = { email: "devil@test.io" }
    chai
      .request(app)
      .post("/users/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('message').eql('User authenticated.')
        done();
      });
  });

  // Login User
  it("Register User Test", done => {
    const user = { email: "dane@test.io" }
    chai
      .request(app)
      .post("/users/register-user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.should.have.property('message').eql('New user added')
        done();
      });
  });

  // User list
  it("List of users", done => {
    chai
      .request(app)
      .get("/users/list/user-list")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
