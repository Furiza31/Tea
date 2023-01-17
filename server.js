// Import modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config.json');

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Trust proxy
app.set('trust proxy', 1);

// Middlewares
app.use(express.static('public'));
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// socket
io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// roots
app.get('/', (req, res) => {
    res.render('pages/index');
});

// Server listening
server.listen(config.port, () => {
    console.log(`listening on http://localhost:${config.port}`);
});