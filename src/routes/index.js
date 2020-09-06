const authRoutes = require("./authRoutes");
const { requireAuth, checkUser } = require("../middlewares/authMiddleware");

module.exports = (app) => {
  app.get("*", checkUser);
  app.get("/", (req, res) => res.render("home"));
  app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
  app.use(authRoutes);
};
