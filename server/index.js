require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middlewares/error-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express()
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENT_URL,
        methods:["GET" , "POST" , "PUT", "DELETE"],
    }
));

// app.use('/api', createProxyMiddleware({
//     target: 'http://127.0.0.1:5173', //original url
//     changeOrigin: true,
//     //secure: false,
//     onProxyRes: function (proxyRes, req, res) {
//         proxyRes.headers['Access-Control-Allow-Origin'] = '*';
//     }
// }));

app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        })
        app.listen(PORT, () => console.log(`server, PORT ${PORT}`))
    } catch (e){
        console.log(e)
    }
}
start()