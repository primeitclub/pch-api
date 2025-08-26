import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
      definition: {
            openapi: "3.0.0",
            info: {
                  title: "PCH API",
                  version: "1.0.0",
                  description: 'API Documentation for Prime CreativeHub App',
            },
      },
      apis: ["./src/modules/**/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;