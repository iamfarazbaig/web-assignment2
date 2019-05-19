const should = require("should");
const profileModel = require("../../models/Profile");
const schema = require("mongoose");

describe("profileModelTests", () => {
  //create a post with random user id before each test
  beforeEach(() => {});

  const profilePayload = {
    user: schema.Types.ObjectId(),
    company: "ABC",
    location: "Earth",
    status: "something",
    skills: "HTML",
    bio: "Biography",
    experience: [
      {
        title: "expTitle",
        company: "theCompany",
        location: "xyz"
      }
    ],
    education: [
      {
        school: "yourSchool",
        degree: "masters",
        fieldofstudy: "CS"
      }
    ],
    social: {
      linkedin: "linkedinProfile",
      github: "githubRepos"
    }
  };

  it("should validate a post with a user and title", done => {
    const m = new profileModel(profilePayload);
    m.validate(err => {
      should.not.exist(err);
      m.user.should.equal(profilePayload.user);
      m.company.toString().should.equal(profilePayload.company);
      m.location.toString().should.equal(profilePayload.location);
      m.status.toString().should.equal(profilePayload.status);
      m.skills.toString().should.equal(profilePayload.skills);
      m.bio.toString().should.equal(profilePayload.bio);
      m.experience.length.should.equal(profilePayload.experience.length);
      m.education.length.should.equal(profilePayload.education.length);
      m.social.linkedin.should.equal(profilePayload.social.linkedin);
      m.social.github.should.equal(profilePayload.social.github);

      done();
    });
  });
});
