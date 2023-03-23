require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("../../packages/server/router/index");
const errorMiddleware = require("../../packages/server/middlewares/error-middleware");

const app = express();
const PORT = process.env.PORT2 || 3000;

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

exports.handler = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        app.listen(PORT, () => console.log(`server, PORT ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};
