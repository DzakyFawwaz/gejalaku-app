const { register, login } = require("../services/firebaseService");

const registerHandler = async (request, h) => {
  const { email, password } = request.payload;

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
    return h.response({ error: error.message }).code(500);
  }
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const user = await login(email, password);
    return h
      .response({
        message: "User logged in successfully",
        user,
      })
      .code(200);
  } catch (error) {
    return h.response({ error: error.message }).code(500);
  }
};

module.exports = {
  registerHandler,
  loginHandler,
};
