
const request = require("supertest");
const app = require("../src/server");
const pool = require("../src/config/db");

afterAll(async () => {
  await pool.end();
});

describe("Employee API", () => {
  test("GET / should return API status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test("GET /api/employees should return employees", async () => {
    const response = await request(app).get("/api/employees");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test("GET employee with invalid ID should return 400", async () => {
    const response = await request(app).get("/api/employees/abc");

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test("GET employee with missing ID should return 404", async () => {
    const response = await request(app).get("/api/employees/999999");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Employee not found");
  });

  test("POST employee with invalid data should return 400", async () => {
    const response = await request(app)
      .post("/api/employees")
      .send({
        employee_name: "",
        email: "wrong-email",
        salary: -500,
        department_id: 1,
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
