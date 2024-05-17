const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3000;

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Server lap trinh front-end',
      version: '1.0.0',
      description: 'server test cho mon lap trinh frontend',
      contact: {
        name: 'admin',
        url: 'http://ec2-3-27-136-112.ap-southeast-2.compute.amazonaws.com:3000',
        email: 'longhnh@lhu.edu.vn',
      },
      servers: [
        {
          url: 'http://ec2-3-27-136-112.ap-southeast-2.compute.amazonaws.com:3000',
        },
      ],
    },
  },
  // List of files to be processed. You can also set globs './routes/*.js'
  apis: ['./index.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /:
 *  get:
 *    description: Welcome to Swagger-jsdoc!
 *    responses:
 *      200:
 *        description: Returns a mysterious string.
 */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Retrieve a list of users
 *    description: Retrieve a list of users from the server.
 *    responses:
 *      200:
 *        description: A list of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                    example: 1
 *                  name:
 *                    type: string
 *                    example: John Doe
 */
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
  ];
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`Swagger docs are available at http://localhost:${port}/api-docs`);
});
