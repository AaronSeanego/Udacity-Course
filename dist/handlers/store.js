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
const store_front_1 = require("../models/store_front");
const database_1 = __importDefault(require("../database"));
const jwt = require("jsonwebtoken");
const store = new store_front_1.StorefrontStore();
const viewPage = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(store.getViewPage());
    let file_name = store.getViewPage();
    // res.sendFile(__dirname + store.getViewPage());
    res.send("../Storefront_App/dist" + store.getViewPage());
    // res.json(file_name);
});
const allUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.getAllUsers();
        console.log(users);
        res.send(users);
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const allItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const items = yield store.getAllItems();
        res.status(200).send(items);
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const userbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.getUserById(req.body.username);
        // res.send(user);
        res.status(200).json(user);
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const addnewItems = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET);
    }
    catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    try {
        const newItem = yield store.addNewItems(_req.body.itemName, _req.body.itemDescription);
        // res.send(newItem);
        res.status(200).json({ "status code": 200, newItem });
        database_1.default.release();
    }
    catch (err) {
        // res.status(400);
        // res.json(err);
    }
});
const storefrontroutes = (app) => {
    app.get('/', (_req, res) => {
        const data = "</h2>Express Server Is Running!!!</h2>";
        res.send(data);
    });
    app.get('/users', allUsers);
    app.get('/users/userById', userbyId);
    app.get('/items/allTimes', allItems);
    app.post('/items/addNewItems', addnewItems);
};
exports.default = storefrontroutes;
