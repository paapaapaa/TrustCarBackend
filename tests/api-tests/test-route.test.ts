import supertest from "supertest";
import server from "../../src/server";


const app = supertest(server);

test("GET /v1/test-route", async () => {
  const response = await app.get("/v1/test-route"); 
  expect(response.text).toEqual("Hello World!");
});