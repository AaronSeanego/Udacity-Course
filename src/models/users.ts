import express, { Response, Request} from "express";
import dotenv from 'dotenv';
const {Client,Pool} = require('pg');
const fs = require('fs');
const path = require("path");
import client from "../database";
const bcrypt = require('bcrypt');

dotenv.config();
const router = express.Router();
let createdUserInforObj = {};
let usersInfoObj:String;
let deletedUserObj = {};

let userInfo;
let signedUser:String;
let passwordCorrect:Boolean;
// export type UsersObj {
//     username: String;
//     password: String;
//     email: String;
// }

export class Users {

    async getUserInfo(username:String,password:String): Promise<any> {
        try {
            await client.connect();
            // const userInfo = await client.query("SELECT username, password, email FROM users WHERE username = '" + username + "'");
            userInfo = await client.query("SELECT password FROM users WHERE username = '" + username + "'");
            // console.log(userInfo.rows);
            
            if(userInfo.rowCount == 0) {
                // usersInfoObj = {
                //     "status": "Not Found",
                //     "message": username + " was not found in the database" 
                // };

                return {
                    "status": "Not Found",
                    "message": username + " was not found in the database" 
                };
            }else if(userInfo.rowCount > 0) {

                if(userInfo.rows.length) {
                    const user = userInfo.rows[0];
                    // console.log(userInfo.rows);

                    bcrypt.compare(password + "pepper", user.password, (err:String, result:String) => {
                        if (err) {

                        }
                        if(result) {
                            passwordCorrect = true;
                        }else {
                            passwordCorrect = false;
                        }
                    });

                }

                if(passwordCorrect == true) {
                    return {
                        "user": username,
                        "status": "Login Successfful",
                        "message": "User was successfully logged in.",
                    };
                }else {
                    return {
                        "status": "Login Failed",
                        "message": "Password did not match",
                    };
                }
            }

        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            console.log(usersInfoObj);
            // client.end();
            // await client.release();
        }
    }

    async createUser(username:String, password:String, email:String): Promise<any> {
        // console.log(username);
        // console.log(password);
        // console.log(email);

        try {
            await client.connect();
            let hashedPassword = await bcrypt.hash(password + "pepper", 10);
            const newUsers = await client.query("INSERT INTO users (username, password, email,password_digest) VALUES ('" + username + "','" + hashedPassword + "','" + email + "','" + hashedPassword + "')");
            createdUserInforObj = newUsers;
            console.log(newUsers);
            if(newUsers.rowCount == 0) {
                return {
                    "status": "Failure",
                    "message": "Record failed to be created"
                }
            }else {
                return {
                    "status": "Successful",
                    "message": "Record successfully created"
                }
            }
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            // client.end();
            // await client.release();
        }
        console.log(createdUserInforObj);
        return createdUserInforObj;
    }

    async deleteUser(username: String): Promise<any> {
        try {
            await client.connect();
            const deletedUser = await client.query("DELETE FROM users WHERE username ='" + username + "'");
            deletedUserObj = deletedUser;
            console.log(deletedUserObj);

            if(deletedUser.rowCount == 0) {
                return {
                    "status": "Failure",
                    "message": "Record failed to be deleted from the database"
                }
            }else {
                return {
                    "status": "Successful",
                    "message": "Record successfully deleted from the database"
                }
            }
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            // client.end();
            // await client.release();
        }

    }
}
