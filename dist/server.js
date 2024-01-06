"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const store_1 = __importDefault(require("./handlers/store"));
const bcrypt = require('bcrypt');
const users_1 = __importDefault(require("./handlers/users"));
const bodyParser = require('body-parser');
// import cors from "cors";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = "3000";
const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
    origin: "https://localhost",
    optionsSuccessStatus: 200
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors(corsOptions));
(0, users_1.default)(app);
(0, store_1.default)(app);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
