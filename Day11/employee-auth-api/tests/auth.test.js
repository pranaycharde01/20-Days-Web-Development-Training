
const request = require("supertest");
const app = require("../src/server");
const pool = require("../src/config/db");

const testEmail = `auth-test-${Date.now()}@example.com`;
const testPassword = "StudentPass123!";

let token;

afterAll(async () => {
  // Remove test user after testing
  await pool.query("DELETE FROM users WHERE email = $1", [testEmail]);

  await pool.end();
});

describe("Authentication API", () => {
  test("POST /api/auth/register should register a student", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Auth Test Student",
        email: testEmail,
        password: testPassword,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.role).toBe("student");
    expect(response.body.data).not.toHaveProperty("password");
    expect(response.body.data).not.toHaveProperty("password_hash");
  });

  test("POST /api/auth/login should return a JWT token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: testPassword,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();

    token = response.body.token;
  });

  test("GET /api/auth/profile should return the logged-in user", async () => {
    const response = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.email).toBe(testEmail);
  });

  test("GET /api/auth/profile should reject requests without a token", async () => {
    const response = await request(app)
      .get("/api/auth/profile");

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("POST /api/auth/login should reject an incorrect password", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: testEmail,
        password: "WrongPassword123!",
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
  });

  test("GET /api/auth/admin should reject a student", async () => {
    const response = await request(app)
      .get("/api/auth/admin")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
    expect(response.body.success).toBe(false);
  });
});
