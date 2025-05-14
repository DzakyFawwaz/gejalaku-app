"use strict";
const Hapi = require("@hapi/hapi");
const { initializeFirebase } = require("./src/services/firebaseService");
const authRoutes = require("./src/routes/authRoutes");

const init = async () => {
  const server = Hapi.server({
    port: 3002,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // Allow all origins
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"], // Allowed headers
        additionalHeaders: ["X-Requested-With"], // Additional headers
      },
    },
  });

  try {
    initializeFirebase();
  } catch (error) {
    console.log(`firebase error | ${error}`);
  }

  // Default route
  server.route({
    method: "GET",
    path: "/",
    handler: () => "Hello World!",
  });

  // Register routes
  server.route(authRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
