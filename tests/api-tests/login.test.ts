import supertest from "supertest";
import server from "../../src/server";

const app = supertest(server);
describe("Login API", () => {
  it("no password and username", async () => {
    const response = await app
      .post("/api/v1/user/login")
      .send({ username: "", password: "" });
    expect(response.status).toEqual(403);
  });
  // it("should authenticate the user with correct credentials", async () => {
  //   const response = await app
  //     .post("/api/v1/user/login")
  //     .send({ username: "testuser", password: "testpassword" });
  //   expect(response.status).toEqual(200);
  //   expect(response.body.authtoken).toBeDefined();
  // });
  // it("should not authenticate the user with invalid credentials", async () => {
  //   const response = await app
  //     .post("/api/v1/user/login")
  //     .send({ username: "wrongusername", password: "wrongpassword" });
  //   expect(response.status).toEqual(404);
  //   expect(response.body.message).toEqual("User not found");
  // });
  // it("should not authenticate the user with invalid password", async () => {
  //   const response = await app
  //     .post("/api/v1/user/login")
  //     .send({ username: "testuser", password: "wrongpassword" });
  //   expect(response.status).toEqual(401);
  // });
  it("should not authenticate with invalid form of data", async () => {
    const response = await app
      .post("/api/v1/user/login")
      .send({ firstname: "testfirstname", lastname: "testlastname" });
    expect(response.status).toEqual(403);
  });
});
