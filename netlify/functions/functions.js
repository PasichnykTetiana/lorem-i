const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("../../packages/server/src/router/index");
const errorMiddleware = require("../../packages/server/src/middlewares/error-middleware");
const productsService = require("../../packages/server/src/service/product-service");
const weService = require("../../packages/server/src/service/we-service");
const userService = require("../../packages/server/src/service/user-service");
const cartService = require("../../packages/server/src/service/cart-service");

const authMiddleware = require("../../packages/server/src/middlewares/auth-middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    // origin: 'http://localhost:8888'
     origin: process.env.CLIENT_URL,
  })
);
mongoose.set("strictQuery", false);
app.use("/api", router);
app.use(errorMiddleware);

exports.handler = async (event) => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    let result;

    const { path } = event;

    function getRefreshToken(cookieHeader) {
      const cookies = cookieHeader ? cookieHeader.split(";") : [];
      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.includes("refreshToken")
      );
      return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
    }
    function getCartId(cookieHeader) {
      const cookies = cookieHeader ? cookieHeader.split(";") : [];
      const refreshTokenCookie = cookies.find((cookie) =>
        cookie.includes("cartId")
      );
      return refreshTokenCookie ? refreshTokenCookie.split("=")[1] : null;
    }
    if (
      event.httpMethod === "GET" &&
      path === "/.netlify/functions/functions/api/products"
    ) {
      result = await productsService.getProducts();
    } else if (
      event.httpMethod === "GET" &&
      path === "/.netlify/functions/functions/api/we"
    ) {
      result = await weService.getWe();
    } else if (
      event.httpMethod === "GET" &&
      path.startsWith("/.netlify/functions/functions/api/products/")
    ) {
      const id = path.split("/").pop();
      result = await productsService.getProductById(id);
    } else if (
      event.httpMethod === "GET" &&
      path.startsWith("/.netlify/functions/functions/api/users")
    ) {
      app.use(authMiddleware);
      result = await userService.getAllUsers();
    } else if (
      event.httpMethod === "GET" &&
      path.startsWith("/.netlify/functions/functions/api/refresh")
    ) {
      const refreshToken = getRefreshToken(event.headers.cookie);
      result = await userService.refresh(refreshToken);
    } else if (
      event.httpMethod === "GET" &&
      path.startsWith("/.netlify/functions/functions/api/activate/")
    ) {
      const id = path.split("/").pop();
      result = await userService.activate(id);
    } else if (
      event.httpMethod === "POST" &&
      path.startsWith("/.netlify/functions/functions/api/logout")
    ) {
      result = await userService.logout();
      return {
        statusCode: 200,
        headers: {
          // "Set-Cookie": [
          //   `refreshToken=; Max-Age=0; HttpOnly; Path=/; Domain=localhost;`,
          // ],
          "Set-Cookie": [
            `refreshToken=; Max-Age=0; HttpOnly; Path=/; Domain=${process.env.DOMAIN};`,
          ],
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      }
    } else if (
      event.httpMethod === "POST" &&
      path.startsWith("/.netlify/functions/functions/api/login")
    ) {
      const { email, password } = JSON.parse(event.body);
      result = await userService.login(email, password);
    } else if (
      event.httpMethod === "GET" &&
      path.startsWith("/.netlify/functions/functions/api/cart")
    ) {
      const refreshToken = getRefreshToken(event.headers.cookie);
      const cartId = getCartId(event.headers.cookie);
      result = await cartService.getCart(refreshToken, cartId);
    } else if (
      event.httpMethod === "POST" &&
      path.startsWith("/.netlify/functions/functions/api/cart/add/")
    ) {
      const id = path.split("/").pop();
      const refreshToken = getRefreshToken(event.headers.cookie);
      const cartId = getCartId(event.headers.cookie);
      result = await cartService.updateCartItem(id, refreshToken, cartId, 1);
    } else if (
      event.httpMethod === "DELETE" &&
      path.startsWith("/.netlify/functions/functions/api/cart/delete/")
    ) {
      const id = path.split("/").pop();
      const refreshToken = getRefreshToken(event.headers.cookie);
      const cartId = getCartId(event.headers.cookie);
      result = await cartService.updateCartItem(id, refreshToken, cartId, -1);
    }
    if (result && result.refreshToken) {
      return {
        statusCode: 200,
        headers: {
          // "Set-Cookie": [
          //   `refreshToken=${result.refreshToken}; Max-Age=2592000; HttpOnly; Path=/; Domain=localhost;`,
          //   `cartId=; Max-Age=0; HttpOnly; Path=/; Domain=localhost;`
          // ],
          "Set-Cookie": [
            `refreshToken=${result.refreshToken}; Max-Age=2592000; HttpOnly; Path=/; Domain=${process.env.DOMAIN};`,
            `cartId=; Max-Age=0; HttpOnly; Path=/; Domain=${process.env.DOMAIN};`
          ],
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      };
    } else if (result && result.sessionId) {
      return {
        statusCode: 200,
        headers: {
          // "Set-Cookie": `cartId=${result._id};Max-Age=2592000; HttpOnly; Path=/; Domain=localhost`,
          "Set-Cookie": `cartId=${result._id};Max-Age=2592000; HttpOnly; Path=/; Domain=${process.env.DOMAIN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    }
  } catch (e) {
    console.log(e);
  }
};
