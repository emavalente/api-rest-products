import request from "supertest";
import server, { dbConnect } from "../server";
import db from "../config/db";

describe("GET to /api", () => {
  test("should send back a json response", async () => {
    const res = await request(server).get("/api");
    //console.log(res);

    // Cuando realizamos un test debemos verificar lo que debe y no debe ser:

    // Lo que debe ser
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body.msg).toBe("Desde Api");

    // Lo que no debe ser
    expect(res.status).not.toBe(404);
    expect(res.body.msg).not.toBe("desde api");
  });
});

// Mock para simular un error en la conección de la base de datos.
// Lo hacemos para optimizar el test coverge.
jest.mock("../config/db");

describe("connect database", () => {
  test("Should handle database connection error", async () => {
    jest.spyOn(db, "authenticate").mockRejectedValueOnce(new Error("DATABASE Connection Error"));

    const consoleSpy = jest.spyOn(console, "log");

    await dbConnect();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("DATABASE Connection Error"));
  });
});
