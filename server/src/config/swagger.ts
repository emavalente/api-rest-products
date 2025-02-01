import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    tags: [
      {
        name: "Products",
        description: "API operations related to products",
      },
    ],
    info: {
      title: "REST API Node.js / Express / Typescript",
      version: "1.0.0",
      description: "API Docs for Products",
    },
  },
  apis: ["./src/routes/productsRoutes.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

// const swaggerUiOptions: SwaggerUiOptions = {
//   customCss: `
//     .topbar-wrapper .link {
//       content: url('url_de_imagen');
//       heigth: 120px;
//       with: auto;
//     }
//   `,
// };

export default swaggerSpec;
// export { SwaggerUiOptions };
