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
const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require("path");
dotenv_1.default.config();
const client = new Client({
    host: "127.0.0.1",
    database: "storefront_db",
    user: "Lapi",
    password: "#03Malapile#03"
});
const app = express_1.default.Router();
let allUsers = [];
function usersLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        let userName = document.querySelector('#username_field');
        let passWord = document.querySelector('#password_field');
        // let userName = username;
        // let passWord = password;
        console.log(userName);
        console.log(passWord);
        try {
            yield client.connect();
            const res = yield client.query('SELECT * FROM users');
            allUsers = res.rows;
            // console.log(res);
            console.log(allUsers);
            yield client.end();
            allUsers.forEach((elements) => {
                console.log(elements.username);
            });
        }
        catch (err) {
            console.error(err);
        }
    });
}
let button = document.querySelector("#login_button");
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    console.log("Hello man!!!");
});
exports.default = usersLogin();
