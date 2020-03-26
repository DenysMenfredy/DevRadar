const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');

const {setupWebSocket} = require('./webSocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

// MongoDB (Não-relacional)
mongoose.connect('mongodb+srv://denysm7:xky4k2nrwr@cluster0-usaxi.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);