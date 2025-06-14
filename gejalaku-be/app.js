const Hapi = require("@hapi/hapi");
const { initializeFirebase } = require("./src/services/firebaseService.js");
const authRoutes = require("./src/routes/authRoutes.js");
const predictRoutes = require("./src/routes/predictRoutes.js");
const { initializeService } = require("./src/services/predictService.js");

const init = async () => {
  const isDevelopment = process.env.NODE_ENV !== "production";
  const serverConfig = {
    port: process.env.PORT || 8888,
    // host: "https://gejalaku-be.vercel.app/",
    routes: {
      cors: {
        origin: ["*"],
        additionalHeaders: [
          "Accept",
          "Authorization",
          "Content-Type",
          "If-None-Match",
          "X-Requested-With",
        ],
        credentials: true,
      },
    },
  };
  const server = Hapi.server(serverConfig);

  try {
    await initializeFirebase();
    await initializeService();
  } catch (error) {
    console.log(`firebase error | ${error}`);
  }
  server.route({
    method: "GET",
    path: "/",
    handler: () => "Hello World!",
  });

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
