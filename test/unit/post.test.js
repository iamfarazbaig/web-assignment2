const should = require("should");
const postModel = require("../../models/Post");
const schema = require("mongoose");

describe("postModelTests", () => {
  //create a post with random user id before each test
  beforeEach(() => {});

  const postPayload = {
    user: schema.Types.ObjectId(),
    text: "qweqww",
    name: "xyz",
    avatar: "ewfewefwefef",
    comments: [
      {
        user: schema.Types.ObjectId(),
        text: "qweqww",
        name: "xyz",
        avatar: "ewfewefwefef"
      }
    ]
  };

  it("should validate a post with a user and title", done => {
    const m = new postModel(postPayload);
    m.validate(err => {
      should.not.exist(err);
      m.user.should.equal(postPayload.user);
      m.text.toString().should.equal(postPayload.text);
      m.name.toString().should.equal(postPayload.name);
      m.avatar.toString().should.equal(postPayload.avatar);
      m.comments.length.should.equal(postPayload.comments.length);
      done();
    });
  });
});
