// const request = require("supertest");
// let server;
//
// describe("/users", () => {
//   beforeEach(() => {
//     server = require("../../server");
//   });
//   afterEach(() => {
//     server.close();
//   });
//   describe("GET /", () => {
//     it("should return all users", async () => {
//       const res = await request(server).get("/users");
//       expect(res.status).toBe(200);
//     });
//   });
// });

const should = require("should");
const userModel = require("../../models/User");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

describe("postModelTests", () => {
  let post = {};
  //create a post with random user id before each test
  beforeEach(() => {});

  const userPayload = {
    name: "xyz",
    email: "something@gmail.com",
    password: "qwe123",
    avatar: "ewfewefwefef"
  };

  it("should validate a user with a name,email,password,avatar", done => {
    const m = new userModel(userPayload);
    m.validate(err => {
      should.not.exist(err);
      m.name.toString().should.equal(userPayload.name);
      m.email.toString().should.equal(userPayload.email);
      m.password.toString().should.equal(userPayload.password);
      m.avatar.toString().should.equal(userPayload.avatar);
      done();
    });
  });
});
