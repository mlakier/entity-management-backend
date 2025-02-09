const chai = require("chai");
const chaiHttp = require("chai-http"); // Ensure chai-http is correctly imported
const { expect } = chai;
const app = require("../index"); // Ensure app is correctly imported

chai.use(chaiHttp); // This applies chai-http for requests

describe("Entities API", () => {
  let authToken;
  let entityId;

  before((done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@example.com", // Ensure this user exists
        password: "password123", // Replace with the correct password
      })
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.body.token;
        done();
      });
  });


  it("should create a new entity", (done) => {
    chai
      .request(app)
      .post("/api/entities")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        entity_name: "Test Entity",
        parent_entity_id: null,
        created_by: 1,
        updated_by: 1,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("entity_id");
        entityId = res.body.entity_id;
        done();
      });
  });

  it("should retrieve all entities", (done) => {
    chai
      .request(app)
      .get("/api/entities")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should retrieve an entity by ID", (done) => {
    chai
      .request(app)
      .get(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("entity_id", entityId);
        done();
      });
  });

  it("should update an entity", (done) => {
    chai
      .request(app)
      .put(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        entity_name: "Updated Entity Name",
        updated_by: 1,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Entity updated successfully");
        done();
      });
  });

  it("should delete an entity", (done) => {
    chai
      .request(app)
      .delete(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Entity deleted successfully");
        done();
      });
  });
});
