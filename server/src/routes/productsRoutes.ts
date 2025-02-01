import { Request, Response, Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "../services/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();
/**
 * @swagger
 * components:
 *      schemas:
 *        Product:
 *         type: object
 *         properties:
 *          id:
 *            type: integer
 *            description: The Product ID
 *            example: 1
 *          name:
 *            type: string
 *            description: The Product name
 *            example: Monitor Curvo 27 pulgadas
 *          price:
 *            type: number
 *            description: The Product price
 *            example: 250,99
 *          availability:
 *            type: boolean
 *            description: The Product availability
 *            example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *        summary: Get a list of products
 *        tags:
 *          - Products
 *        description: Return a list of products.
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *        summary: Get a product by ID
 *        tags:
 *          - Products
 *        description: Return a product based on its unique ID.
 *        parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Not Found
 *          404:
 *            description: Bad Request - Invalid ID
 */
router.get("/:id", param("id").isInt().withMessage("ID de producto inválido"), handleInputErrors, getProductById);

/**
 * @swagger
 * /api/products:
 *      post:
 *        summary: Creates a new product
 *        tags:
 *          - Products
 *        description: Return a new record in the database.
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: "Monitor Curvo 32 pulgadas"
 *                  price:
 *                    type: number
 *                    example: 399
 *        responses:
 *          201:
 *            description: Product created successfully
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Bad Request - invalid input data
 */
router.post(
  "/",
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("El nombre del precio es obligatorio")
    .isNumeric()
    .withMessage("El valor de precio es inválido")
    .custom((value) => value > 0)
    .withMessage("El valor de precio es inválido"),
  handleInputErrors,
  createProduct
);

/**
 * @swagger
 * /api/product/{id}:
 *      put:
 *        summary: Udates a product with user input
 *        tags:
 *          - Products
 *        description: Returns the updated product
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: "Monitor Curvo 32 pulgadas"
 *                  price:
 *                    type: number
 *                    example: 399
 *                  availability:
 *                    type: boolean
 *                    example: true
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Bad Request - Invalid ID or invalid input data
 *          404:
 *            description: Product not found
 */
router.put(
  "/:id",
  param("id").isInt().withMessage("ID de producto inválido"),
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .notEmpty()
    .withMessage("El nombre del precio es obligatorio")
    .isNumeric()
    .withMessage("El valor de precio es inválido")
    .custom((value) => value >= 0)
    .withMessage("El valor de precio es inválido"),
  body("availability").isBoolean().withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *        summary: Update Product availability
 *        tags:
 *          - Products
 *        description: Returns the updated availability
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'
 *          400:
 *            description: Bad Request - Invalid ID
 *          404:
 *            description: Product not found
 */
router.patch("/:id", param("id").isInt().withMessage("ID de producto inválido"), handleInputErrors, updateAvailability);

/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *        summary: Deletes a complete product by a given ID
 *        tags:
 *          - Products
 *        description: Returns a confirmation message
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema:
 *              type: integer
 *        responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  value: "Producto eliminado correctamente"
 *          400:
 *            description: Bad Request - Invalid ID
 *          404:
 *            description: Product not found
 */
router.delete("/:id", param("id").isInt().withMessage("ID de producto inválido"), handleInputErrors, deleteProduct);

export default router;
