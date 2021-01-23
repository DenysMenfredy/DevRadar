const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
require('dotenv').config({path: __dirname + '/.env'});
const { setupWebSocket } = require('./webSocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

const atlasUser = process.env.ATLAS_USER;
const atlasPassword = process.env.ATLAS_PASSWORD;
// console.log(atlasPassword);

// MongoDB (Não-relacional)
mongoose.connect(`mongodb+srv://${atlasUser}:${atlasPassword}@cluster0-usaxi.mongodb.net/omnistack10?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
    console.log("Database Connected");
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);