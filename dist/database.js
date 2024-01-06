"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require("path");
dotenv_1.default.config();
const router = express_1.default.Router();
let client;
// const {
//     POSTGRES_HOST,
//     POSTGRES_DATABASE,
//     POSTGRES_USER,
//     POSTGRES_PASSWORD,
//     POSTGRES_TEST_DATABASE,
//     ENV,
//   } = process.env
// if(process.env.ENV === 'dev') {
//     client = new Pool({
//         host: POSTGRES_HOST,
//         database: POSTGRES_DATABASE,
//         user: POSTGRES_USER,
//         password: POSTGRES_PASSWORD
//     });    
// }
// client = new Pool({
//     host: POSTGRES_HOST,
//     database: POSTGRES_DATABASE,
//     user: POSTGRES_USER,
//     password: POSTGRES_PASSWORD
// });   
client = new Pool({
    host: "127.0.0.1",
    database: "storefront_db",
    user: "Lapi",
    password: "#03Malapile#03"
});
// if(process.env.ENV === 'test') {
//     client = new Pool({
//         host: POSTGRES_HOST,
//         database: POSTGRES_DATABASE,
//         user: POSTGRES_USER,
//         password: POSTGRES_TEST_DATABASE
//     });    
// }
// export default router;
exports.default = client;
