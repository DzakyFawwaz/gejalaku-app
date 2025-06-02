const Hapi = require("@hapi/hapi");
const { initializeFirebase } = require("./src/services/firebaseService.js");
const authRoutes = require("./src/routes/authRoutes.js");
const predictRoutes = require("./src/routes/predictRoutes.js");
const { loadModel, loadLabels, ALL_MODEL_SYMPTOMS_ARRAY } = require("./src/services/predictService.js");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8888,
    // host: "https://gejalaku-be.vercel.app/",
    routes: {
      cors: {
        origin: ["*"], // Allow all origins
        headers: ["Accept", "Authorization", "Content-Type", "If-None-Match"], // Allowed headers
        additionalHeaders: ["X-Requested-With"], // Additional headers
      },
    },
  });

  try {
    await initializeFirebase();
    await loadModel();  // Muat model saat server start
    await loadLabels(); // Muat labels saat server start
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
  server.route(predictRoutes);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
