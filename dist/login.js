"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { Client } = require('pg');
const database_1 = __importDefault(require("./database"));
const bcrypt = require('bcrypt');
dotenv_1.default.config();
const app = express_1.default.Router();
let allUsers = [];
const hash = bcrypt.hash(process.env.BCRYPT_PASSWORD + "pepper", process.env.SALT_ROUNDS, function (err, hash) {
    console.log(hash);
});
// function getPassword() {
//     // const hash = bcrypt.hashSync(process.env.BCRYPT_PASSWORD + "pepper", parseInt(process.env.SALT_ROUNDS:String))
//     const hash = bcrypt.hash(process.env.BCRYPT_PASSWORD + "pepper", process.env.SALT_ROUNDS, function(err:any, hash:any) {
//         console.log(hash);
//     });
// }
function authenticate(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        const sql = "SELECT password_digest FROM users WHERE username=($1)";
        const result = yield conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
        }
    });
}
// export default logPage;
