const handleFirebaseError = require("../helpers/auth");
const { register, login } = require("../services/firebaseService");

const registerHandler = async (request, h) => {
  const { email = null, password = null } = request.payload;

  if (!email || !password) {
    return h.response({ error: "Email and password are required" }).code(400);
  }

  try {
    const user = await register(email, password);
    return h
      .response({
        message: "User registered successfully",
        email,
        user,
      })
      .code(201);
  } catch (error) {
    return h.response({ error: handleFirebaseError(error) }).code(500);
  }
};

const loginHandler = async (request, h) => {
  const { email = null, password = null } = request.payload;

  if (!email || !password) {
    return h.response({ error: "Email and password are required" }).code(400);
  }

  try {
    const user = await login(email, password);

    const { providerData, stsTokenManager } = user;
    const { uid, displayName, photoURL } = providerData[0];
    return h
      .response({
        message: "User logged in successfully",
        data: {
          uid,
          displayName,
          photoURL,
          accessToken: stsTokenManager.accessToken,
        },
      })
      .code(200);
  } catch (error) {
    return h.response({ error: handleFirebaseError(error) }).code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
