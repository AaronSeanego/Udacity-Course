import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import router from './database';
import storefrontroutes from './handlers/store';
const bcrypt = require('bcrypt');
import users_func from './handlers/users';
const bodyParser = require('body-parser');

// import cors from "cors";
dotenv.config();

const app: express.Application = express();
const port = "3000";
const oneDay = 1000 * 60 * 60 * 24;

const corsOptions = {
    origin: "https://localhost",
    optionsSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors(corsOptions));
users_func(app);
storefrontroutes(app);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});