const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT;
const session = require('express-session');
const store = session.MemoryStore();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.options('*', cors());
app.enable("trust proxy", 1);
app.use(cookieParser());
app.use(helmet());
app.use(cors({credentials: true, origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 1000*60*60, sameSite: 'none'},
    store,
}));

app.use((err, req, res, next) => {
    res.send(err.message);
});

app.listen(port, ()=> {
    console.log(`E-Commerce App listening on port ${port}`);
});

