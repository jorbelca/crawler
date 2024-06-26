import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src";
import http from "http";

describe("Security Tests", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app).listen(1234, function () {
      console.log("Server listening on port 1234");
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  // Test de autenticación y autorización
  it(
    "should prevent brute force attacks",
    async () => {
      for (let i = 0; i < 50; i++) {
        await request(server)
          .post("/api/login")
          .send({ username: "user", password: "wrongpassword" });
      }
      const res = await request(server)
        .post("/api/login")
        .send({ username: "user", password: "wrongpassword" });

      expect(res.status).toBe(429); // Demasiados intentos
    },
    { timeout: 20000 }
  );

  // Test de encabezados de seguridad
  it("should have security headers", async () => {
    const res = await request(server).get("/");
    expect(res.headers).toHaveProperty("strict-transport-security");
    expect(res.headers).toHaveProperty("content-security-policy");
    expect(res.headers).toHaveProperty("x-content-type-options", "nosniff");
    expect(res.headers).toHaveProperty("x-frame-options");
  });

  // Test de inyección SQL
  it("should prevent SQL injection", async () => {
    const res = await request(server)
      .post("/api/login")
      .send({ username: "' OR 1=1 --", password: "password" });

    expect(res.status).toBe(401); // No autorizado
  });

  // Test de XSS
  it("should prevent XSS", async () => {
    const res = await request(server)
      .post("/comments")
      .send({ comment: '<script>alert("XSS")</script>' });

    expect(res.status).toBe(400); // Solicitud incorrecta
    expect(res.text).not.toContain("<script>");
  });
});
