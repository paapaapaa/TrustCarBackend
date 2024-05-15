import supertest from "supertest";
import server from "../../src/server";
// import { PrismaClient } from "@prisma/client";

const app = supertest(server);
// const prisma = new PrismaClient();

describe("Get Report Structure API Test", () => {
  it("should return 401 when request does not have Auth token", async () => {
    const response = await app.get("/api/v1/report/structure");
    expect(response.status).toBe(401);
    expect(response.text).toBe("token is missing or invalid");
  });

  // it("should return 200 when request has Auth token with default values fi, full and pertrol", async () => {
  //   const response = await app
  //     .post("/api/v1/user/login")
  //     .send({ username: "testuser", password: "testpassword" });
  //   const token = response.body.authToken as string;
  //   const response2 = await app
  //     .get("/api/v1/report/structure")
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response2.status).toBe(200);
  //   expect(response2.body).toEqual(expect.any(Array));
  //   expect(response2.body.length).toBe(2);
  //   expect(response2.body[0]).toEqual({
  //     id: 1,
  //     name: "test section 1 with ln-id 2",
  //     questions: [
  //       {
  //         id: 1,
  //         name: "test quetion 1 ln-id 2",
  //       },
  //     ],
  //   });

  //   expect(response2.body[1]).toEqual({
  //     id: 3,
  //     name: "test section 3 with ln-id 2",
  //     questions: [
  //       {
  //         id: 4,
  //         name: "test quetion 4 ln-id 2",
  //       },
  //     ],
  //   });
  // });

  // it("should return 200 when request has Auth token with values set to en, narrow and petrol", async () => {
  //   const response = await app
  //     .post("/api/v1/user/login")
  //     .send({ username: "testuser", password: "testpassword" });
  //   const token = response.body.authToken as string;
  //   const response2 = await app
  //     .get(
  //       "/api/v1/report/structure?language=en&report_type=narrow&engine_type=petrol"
  //     )
  //     .set("Authorization", `Bearer ${token}`);
  //   expect(response2.status).toBe(200);
  //   expect(response2.body).toEqual(expect.any(Array));
  //   expect(response2.body.length).toBe(1);
  //   expect(response2.body[0]).toEqual({
  //     id: 1,
  //     name: "test section 1 with ln-id 1",
  //     questions: [
  //       {
  //         id: 3,
  //         name: "test quetion 3 ln-id 1",
  //       },
  //     ],
  //   });
  // });
});

// describe("Save Report API Test", () => {
//   afterAll(async () => {
//     await prisma.attachments.deleteMany({});
//     await prisma.report_row.deleteMany({});
//     await prisma.report.deleteMany({});
//   });

//   it("should return 401 when request does not have Auth token", async () => {
//     const response = await app.post("/api/v1/report").send({
//       registration_number: "ABC-123",
//       engine_type: "petrol",
//       brand_and_model: "Toyota Corolla",
//       odometer_reading: 10000,
//       production_number: "123456",
//       report_rows: [
//         {
//           question_id: 1,
//           inspection_status: "yellow",
//           comment: "string",
//           attachments: [
//             {
//               attachment_type: "image",
//               data: "string",
//             },
//           ],
//         },
//       ],
//     });
//     expect(response.status).toBe(401);
//     expect(response.text).toBe("token is missing or invalid");
//   });

//   it("should return 200 when request has Auth token with default values", async () => {
//     const response = await app
//       .post("/api/v1/user/login")
//       .send({ username: "testuser", password: "testpassword" });
//     const token = response.body.authToken as string;
//     const response2 = await app
//       .post("/api/v1/report")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         registration_number: "ABC-123",
//         engine_type: "petrol",
//         brand_and_model: "Toyota Corolla",
//         odometer_reading: 10000,
//         production_number: "123456",
//         report_rows: [
//           {
//             question_id: 1,
//             inspection_status: "yellow",
//             comment: "string",
//             attachments: [
//               {
//                 attachment_type: "image",
//                 data: "string",
//               },
//             ],
//           },
//         ],
//       });
//     expect(response2.status).toBe(201);
//   });
// });

// describe("Get Report API Test", () => {
//   beforeAll(async () => {
//     const response = await app
//       .post("/api/v1/user/login")
//       .send({ username: "testuser", password: "testpassword" });
//     const token = response.body.authToken as string;
//     await app
//       .post("/api/v1/report")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         registration_number: "ABC-123",
//         engine_type: "petrol",
//         brand_and_model: "Toyota Corolla",
//         odometer_reading: 10000,
//         production_number: "123456",
//         report_rows: [
//           {
//             question_id: 1,
//             inspection_status: "yellow",
//             comment: "string",
//             attachments: [
//               {
//                 attachment_type: "image",
//                 data: "string",
//               },
//             ],
//           },
//         ],
//       });


//     await app
//       .post("/api/v1/report")
//       .set("Authorization", `Bearer ${token}`)
//       .send({
//         registration_number: "ABC-123",
//         engine_type: "petrol",
//         brand_and_model: "Toyota Corolla",
//         odometer_reading: 10000,
//         production_number: "123456",
//         report_rows: [
//           {
//             question_id: 1,
//             inspection_status: "yellow",
//             comment: "string",
//             attachments: [
//               {
//                 attachment_type: "image",
//                 data: "string",
//               },
//             ],
//           },
//         ],
//       });
//   });
//   it("should return 401 when request does not have Auth token", async () => {
//     const response = await app.get(
//       "/api/v1/report?registration_number=ABC-123"
//     );
//     expect(response.status).toBe(401);
//     expect(response.text).toBe("token is missing or invalid");
//   });

//   it("should return 200 when request has Auth token", async () => {
//     const response = await app
//       .post("/api/v1/user/login")
//       .send({ username: "testuser", password: "testpassword" });
//     const token = response.body.authToken as string;
//     const response2 = await app
//       .get("/api/v1/report?registration_number=ABC-123")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response2.status).toBe(200);
//     expect(response2.body).toEqual(expect.any(Array));
//     expect(response2.body.length).toBe(2);
//     expect(response2.body[0]).toMatchObject({
//       registration_number: "ABC-123",
//       engine_type: "petrol",
//       brand_and_model: "Toyota Corolla",
//       odometer_reading: 10000,
//       production_number: "123456",
//     });
//   });

//   afterAll(async () => {
//     await prisma.attachments.deleteMany({});
//     await prisma.report_row.deleteMany({});
//     await prisma.report.deleteMany({});
  // });
// });
