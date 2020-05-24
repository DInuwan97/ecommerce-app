const express = require('express');
const app = express();
const path = require('path');
const httpProxy = require('http-proxy-middleware');

var backend = 'https://bionicsfashion.herokuapp.com'

app.use('/api', httpProxy.createProxyMiddleware({ target: backend, changeOrigin: true }));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT = process.env.PORT || 5002;


app.listen(PORT, () => { console.log("Server Started on PORT " + PORT); })