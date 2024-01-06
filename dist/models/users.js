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
exports.Users = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const { Client, Pool } = require('pg');
const fs = require('fs');
const path = require("path");
const database_1 = __importDefault(require("../database"));
const bcrypt = require('bcrypt');
dotenv_1.default.config();
const router = express_1.default.Router();
let createdUserInforObj = {};
let usersInfoObj;
let deletedUserObj = {};
let userInfo;
let signedUser;
let passwordCorrect;
// export type UsersObj {
//     username: String;
//     password: String;
//     email: String;
// }
class Users {
    getUserInfo(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.connect();
                // const userInfo = await client.query("SELECT username, password, email FROM users WHERE username = '" + username + "'");
                userInfo = yield database_1.default.query("SELECT password FROM users WHERE username = '" + username + "'");
                // console.log(userInfo.rows);
                if (userInfo.rowCount == 0) {
                    // usersInfoObj = {
                    //     "status": "Not Found",
                    //     "message": username + " was not found in the database" 
                    // };
                    return {
                        "status": "Not Found",
                        "message": username + " was not found in the database"
                    };
                }
                else if (userInfo.rowCount > 0) {
                    if (userInfo.rows.length) {
                        const user = userInfo.rows[0];
                        // console.log(userInfo.rows);
                        bcrypt.compare(password + "pepper", user.password, (err, result) => {
                            if (err) {
                            }
                            if (result) {
                                passwordCorrect = true;
                            }
                            else {
                                passwordCorrect = false;
                            }
                        });
                    }
                    if (passwordCorrect == true) {
                        return {
                            "user": username,
                            "status": "Login Successfful",
                            "message": "User was successfully logged in.",
                        };
                    }
                    else {
                        return {
                            "status": "Login Failed",
                            "message": "Password did not match",
                        };
                    }
                }
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                console.log(usersInfoObj);
                // client.end();
                // await client.release();
            }
        });
    }
    createUser(username, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(username);
            // console.log(password);
            // console.log(email);
            try {
                yield database_1.default.connect();
                let hashedPassword = yield bcrypt.hash(password + "pepper", 10);
                const newUsers = yield database_1.default.query("INSERT INTO users (username, password, email,password_digest) VALUES ('" + username + "','" + hashedPassword + "','" + email + "','" + hashedPassword + "')");
                createdUserInforObj = newUsers;
                console.log(newUsers);
                if (newUsers.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "Record failed to be created"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "Record successfully created"
                    };
                }
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                // client.end();
                // await client.release();
            }
            console.log(createdUserInforObj);
            return createdUserInforObj;
        });
    }
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.connect();
                const deletedUser = yield database_1.default.query("DELETE FROM users WHERE username ='" + username + "'");
                deletedUserObj = deletedUser;
                console.log(deletedUserObj);
                if (deletedUser.rowCount == 0) {
                    return {
                        "status": "Failure",
                        "message": "Record failed to be deleted from the database"
                    };
                }
                else {
                    return {
                        "status": "Successful",
                        "message": "Record successfully deleted from the database"
                    };
                }
            }
            catch (err) {
                console.error(err);
                throw err;
            }
            finally {
                // client.end();
                // await client.release();
            }
        });
    }
}
exports.Users = Users;
