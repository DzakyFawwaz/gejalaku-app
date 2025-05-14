const {
  registerHandler,
  loginHandler,
} = require("../controllers/authController");

module.exports = [
  {
    method: "POST",
    path: "/register",
    handler: registerHandler,
  },
  {
    method: "POST",
    path: "/login",
    handler: loginHandler,
  },
];
