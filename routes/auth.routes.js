const { verifySignUp } = require("../middleware/index");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // this is the sign up routes
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    // call the signup method
    controller.signup
  );
  // call the sign in method
  app.post("/api/auth/signin", controller.signin);
};
