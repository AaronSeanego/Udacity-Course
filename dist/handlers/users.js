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
const users_1 = require("../models/users");
const bcrypt = require("bcrypt");
const database_1 = __importDefault(require("../database"));
const jwt = require("jsonwebtoken");
const users_info = new users_1.Users();
// const getUsers = async (req: Request, res: Response) => {
//     try {
//         const usersData = await users_info.getUserInfo(req.body.username,req.body.password);
//         console.log(usersData);
//     } catch (err) {
//         // console.error(err);
//         // res.status(400);
//         res.json(err);
//     }
// }
const getUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const authorizationHeader = _req.headers.authorization;
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split('')[1];
        console.log(token);
        // const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const usersData = yield users_info.getUserInfo(_req.body.username, _req.body.password);
        console.log(usersData.user);
        if (usersData.status == "Login Successfful") {
        }
        res.status(200).json({ "status": "200", "data": usersData });
        database_1.default.release();
    }
    catch (err) {
        // console.error(err);
        // res.status(400);
        // res.json(err);
    }
});
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let hashedPassword = await bcrypt.hash(req.body.password + "pepper", 10);
        const newUsers_Info = yield users_info.createUser(req.body.username, req.body.password, req.body.email);
        console.log(newUsers_Info);
        var token = jwt.sign({ user: newUsers_Info }, process.env.TOKEN_SECRET);
        res.status(200).json({ "status": "200", "data": newUsers_Info, "token": token });
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteUser_Data = yield users_info.deleteUser(req.body.username);
        console.log(deleteUser_Data);
        res.status(200).json({ "status": "200", "data": deleteUser_Data });
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const users_func = (app) => {
    app.get('/users/login', getUsers);
    app.post('/users/register', createNewUser);
    app.post('/users/deleteUser', deleteUser);
};
exports.default = users_func;
