import swaggerJSDoc from "swagger-jsdoc";
import { isProd } from "../lib";

const options: swaggerJSDoc.Options = {
      definition: {
            openapi: "3.0.0",
            info: {
                  title: "PCH API",
                  version: "1.0.0",
                  description: 'API Documentation for Prime CreativeHub App',
            },
      },
      tags: [
            {
                  name: "Authentication",
                  description: "Authentication routes",
            },
            {
                  name: "Users",
                  description: "User routes",
            },
            {
                  name: "History",
                  description: "History routes",
            },
            {
                  name: "Teams",
                  description: "Teams routes",
            },
      ],
      apis: [isProd ? process.cwd() + "/dist/modules/**/*.route.js" : process.cwd() + "/src/modules/**/*.route.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;