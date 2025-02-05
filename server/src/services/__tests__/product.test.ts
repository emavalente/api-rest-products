import request from "supertest";
import server from "../../server";

describe("POST to /api/products", () => {
  test("should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(0);
  });

  test("should validate that the price is grater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor Curvo 27 pulgadas - from testing",
      price: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(0);
  });

  test("should validate that the price is a number and grater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor Curvo 27 pulgadas - from testing",
      price: "Hola",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(0);
  });

  test("should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse - from testing",
      price: 200,
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET to /api/products", () => {
  test("should check if api/products url exists", async () => {
    const response = await request(server).get("/api/products");
    expect(response.status).not.toBe(404);
  });

  test("Should return a JSON response with products", async () => {
    const response = await request(server).get("/api/products");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveLength(1);

    expect(response.status).not.toEqual([]);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET to /api/products/:id", () => {
  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("ID de producto inválido. El producto no existe");
  });

  test("should check a valid ID in the URL", async () => {
    const response = await request(server).get("/api/products/not-valid-id");
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID de producto inválido");
  });

  test("Get a JSON response for a single product", async () => {
    const response = await request(server).get("/api/products/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT to /api/products/:id", () => {
  test("should check a valid ID in the URL", async () => {
    const response = await request(server).put("/api/products/not-valid-id").send({
      name: "Monitor 17 pulgadas",
      availability: true,
      price: 499,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID de producto inválido");
  });

  test("Should display five validation errors messages when updated data is empty", async () => {
    const response = await request(server).put("/api/products/1").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(5);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should validate that the price is greatest than 0", async () => {
    const response = await request(server).put("/api/products/1").send({
      name: "Monitor 17 pulgadas",
      availability: true,
      price: -499,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("El valor de precio es inválido");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should return a 404 response for a non-existent product", async () => {
    const productId = 2000;
    const response = await request(server).put(`/api/products/${productId}`).send({
      name: "Monitor 17 pulgadas",
      availability: true,
      price: 499,
    });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("ID de producto inválido. El producto no existe");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should update an existing product with valid data", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Mousepad 1m Dragon Ball Z",
      availability: true,
      price: 40,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("PATCH to /api/products/:id", () => {
  test("Should to check a valid url", async () => {
    const response = await request(server).patch("/api/products/not-valid-id");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID de producto inválido");
  });

  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).patch(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("ID de producto inválido. El producto no existe");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should update the product availability", async () => {
    const response = await request(server).patch(`/api/products/1`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.availability).toBe(false);

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});

describe("DELETE to /api/products/:id", () => {
  test("Should to check a valid url", async () => {
    const response = await request(server).delete("/api/products/not-valid-id");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID de producto inválido");
  });

  test("Should return a 404 response for a non-existing product", async () => {
    const productId = 2000;
    const response = await request(server).delete(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("ID de producto inválido. El producto no existe");

    expect(response.status).not.toBe(200);
  });

  test("Should delete a product with valid id", async () => {
    const response = await request(server).delete(`/api/products/1`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBe("El Producto ha sido eliminado correctamente");

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty("error");
  });
});
