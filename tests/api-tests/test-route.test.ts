import supertest from "supertest";
import server from "../../src/server";


const app = supertest(server);

test("GET /api/v1/test-route", async () => {
  const response = await app.get("/api/v1/test-route"); 
  expect(response.text).toEqual("Hello World!");
});