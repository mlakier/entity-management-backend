const chai = require("chai");
const request = require("supertest"); // ✅ Use supertest instead of chai-http
const { expect } = chai;
const app = require("../index");

describe("Entities API", () => {
  let authToken;
  let entityId;

  // ✅ Authenticate before running tests
  before((done) => {
    request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@example.com", // ✅ Ensure this user exists
        password: "password123", // ✅ Replace with actual password
      })
      .end((err, res) => {
        if (err) return done(err);
        authToken = res.body.token;
        console.log("Auth Token:", authToken); // Add this line
        expect(authToken).to.be.a("string");
        done();
      });
  });

  // ✅ Create a new entity
  it("should create a new entity", (done) => {
    request(app)
      .post("/api/entities")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        entity_name: "Test Entity",
        base_currency: "USD",
        region: "North America",
        tax_id: "123-456-789",
        created_by: 1, // Replace with an actual user ID
        updated_by: 1,
      })
      .end((err, res) => {
        if (err) return done(err);
        console.log("Auth Token:", authToken); // Add this line
        expect(res.status).to.equal(201);
        expect(res.body).to.have.property("entity_id");
        entityId = res.body.entity_id;
        done();
      });
  });

  // ✅ Get all entities
  it("should retrieve all entities", (done) => {
    request(app)
      .get("/api/entities")
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  // ✅ Get entity by ID
  it("should retrieve an entity by ID", (done) => {
    request(app)
      .get(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        console.log("Retrieve Entity Response:", res.body); // Add this line
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("entity_id", entityId);
        done();
      });
  });

  // ✅ Update entity
  it("should update an entity", (done) => {
    request(app)
      .put(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        entity_name: "Updated Entity Name",
        updated_by: 1,
      })
      .end((err, res) => {
        if (err) return done(err);
        console.log("Update Entity Response:", res.body); // Add this line
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Entity updated successfully");
        done();
      });
  });

  // ✅ Delete entity
  it("should delete an entity", (done) => {
    request(app)
      .delete(`/api/entities/${entityId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .end((err, res) => {
        if (err) return done(err);
        console.log("Delete Entity Response:", res.body); // Add this line
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("message", "Entity deleted successfully");
        done();
      });
  });
});
