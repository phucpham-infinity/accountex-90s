import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api", // define api folder under app
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Accountex API",
        version: "1.0.0",
        description: "OpenAPI Documentation for Accountex-90s",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
          Course: {
            type: "object",
            properties: {
              _id: { type: "string", example: "65f1a2b3c4d5e6f7a8b9c0d1" },
              title: { type: "string", example: "Introduction to TypeScript" },
              description: {
                type: "string",
                example: "Learn TypeScript from scratch",
              },
              image: {
                type: "string",
                example: "https://example.com/image.png",
              },
              price: { type: "number", example: 99000 },
              status: {
                type: "string",
                enum: ["draft", "published", "archived"],
                example: "draft",
              },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
