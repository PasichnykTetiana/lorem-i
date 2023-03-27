const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("../../packages/server/src/router/index");
const errorMiddleware = require("../../packages/server/src/middlewares/error-middleware");
const productsService = require("../../packages/server/src/service/product-service");
const weService = require("../../packages/server/src/service/we-service");
const userService = require("../../packages/server/src/service/user-service");
const authMiddleware = require("../../packages/server/src/middlewares/auth-middleware");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    })
);
mongoose.set("strictQuery", false);
app.use("/api", router);
app.use(errorMiddleware);

exports.handler = async (event, context) => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        let result;

        const { path } = event;

        if (event.httpMethod === 'GET' && path === "/.netlify/functions/functions/api/products") {
            result = await productsService.getProducts();
        } else if (event.httpMethod === 'GET' && path === "/.netlify/functions/functions/api/we") {
            result = await weService.getWe();
        }else if (event.httpMethod === 'GET' && path.startsWith("/.netlify/functions/functions/api/products/")) {
            const id = path.split("/").pop();
            result = await productsService.getProductById(id);
        }else if (event.httpMethod === 'GET' && path.startsWith("/.netlify/functions/functions/api/users")) {
            app.use(authMiddleware);
            result = await userService.getAllUsers()
        }else if (event.httpMethod === 'GET' && path.startsWith("/.netlify/functions/functions/api/refresh")) {
            const { refreshToken } = event.cookies;
            result = await userService.refresh(refreshToken);
            const response = {
                statusCode: 200,
                body: JSON.stringify(result),
                headers: {
                    "Set-Cookie": `refreshToken=${result.refreshToken}; Max-Age=${30 * 24 * 60 * 60}; HttpOnly`,
                    "Content-Type": "application/json",
                },
            };
            return response;
        }else if (event.httpMethod === 'GET' && path.startsWith("/.netlify/functions/functions/api/activate/")) {
            const id = path.split("/").pop();
            result = await userService.activate(id)
        } else if (event.httpMethod === 'POST' && path.startsWith("/.netlify/functions/functions/api/logout")) {
            result = await userService.logout();
        } else if (event.httpMethod === 'POST' && path.startsWith("/.netlify/functions/functions/api/login")) {
            const { email, password } = JSON.parse(event.body);
            result = await userService.login(email, password);
        }
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (e) {
        console.log(e);
    }
};