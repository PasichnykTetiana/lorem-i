const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const weController = require("../controllers/we-controller");
const productController = require("../controllers/product-controller");
const cartController = require("../controllers/cart-controller");

const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("username").isLength({ min: 2, max: 32 }),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/cart/add/:id", cartController.addToCart);
router.get("/cart", cartController.getCart);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/we", weController.getWe);
router.get("/products", productController.getProducts);
router.get('/products/:id', productController.getProduct);

module.exports = router;
