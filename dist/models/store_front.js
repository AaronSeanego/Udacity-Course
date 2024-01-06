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
exports.StorefrontStore = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import logPage from "./login";
const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require("path");
const database_1 = __importDefault(require("../database"));
dotenv_1.default.config();
const router = express_1.default.Router();
let userDataObj = {};
let itemDataObj = {};
let updateResponse = {};
// export type Items {
//     id: Number;
//     item_name: String;
//     item_description: String;
// }
class StorefrontStore {
    getViewPage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //@ts-ignore
                // router.get('/', (req:Request, res:Response) => {
                //     // res.send(logPage);
                //     res.sendFile(__dirname + '/login.html');
                // });
                let fileName = '/login.html';
                return String(fileName);
            }
            catch (err) {
                console.error(err);
            }
            finally {
                database_1.default.release();
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            userDataObj = {};
            try {
                yield database_1.default.connect();
                const res = yield database_1.default.query('SELECT * FROM users');
                userDataObj = res.rows;
                if (res.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "Users not found!!"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "User information retrieved successfully",
                        "data": userDataObj
                    };
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                // client.release();
            }
        });
    }
    getUserById(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            console.log(userId);
            userDataObj = {};
            try {
                yield database_1.default.connect();
                const res = yield database_1.default.query("SELECT * FROM users WHERE id ='" + username + "'");
                userDataObj = res.rows;
                if (res.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "User was not found!!"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "User information retrieved successfully",
                        "data": userDataObj
                    };
                }
                // return userDataObj;
            }
            catch (err) {
                console.error(err);
            }
            finally {
                // client.release();
            }
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            itemDataObj = {};
            try {
                yield database_1.default.connect();
                const resItems = yield database_1.default.query('SELECT * FROM store_items');
                itemDataObj = resItems.rows;
                if (resItems.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "Items could not be retrieved from the database. No records found"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "Record successfully retrieved from the database",
                        "data": itemDataObj
                    };
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                // client.release();
            }
        });
    }
    addNewItems(items_Name, items_Description) {
        return __awaiter(this, void 0, void 0, function* () {
            //@ts-ignore
            updateResponse = {};
            try {
                yield database_1.default.connect();
                const newItems = yield database_1.default.query("INSERT INTO store_items (item_name,item_description) VALUES ('" + items_Name + "','" + items_Description + "')");
                // const newItems = await client.query("INSERT INTO store_items (item_name,item_description) VALUES (" + item_Name + "," + item_Description + ")");
                updateResponse = newItems.rows;
                console.log(updateResponse);
                if (newItems.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "Items could not be inserted into the database"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "Record successfully added into the database",
                        "data": newItems.rows
                    };
                }
            }
            catch (err) {
                console.error(err);
            }
            finally {
                // client.release();
            }
        });
    }
}
exports.StorefrontStore = StorefrontStore;
