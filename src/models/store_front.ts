import express, { Response, Request} from "express";
import dotenv from 'dotenv';
// import logPage from "./login";
const {Client,Pool} = require('pg');
const fs = require('fs');
const path = require("path");
import client from "../database";

dotenv.config();
const router = express.Router();


let userDataObj = {};
let itemDataObj = {};
let updateResponse = {};
// export type Items {
//     id: Number;
//     item_name: String;
//     item_description: String;
// }

export class StorefrontStore {
    async getViewPage(): Promise<any> {
        try {
            //@ts-ignore
            // router.get('/', (req:Request, res:Response) => {
            //     // res.send(logPage);
            //     res.sendFile(__dirname + '/login.html');
            // });
            let fileName: String = '/login.html';
            return String(fileName);
        } catch (err) {
            console.error(err);
        } finally {
            client.release();
        }
    }

    async getAllUsers(): Promise<any> {
        // @ts-ignore
        userDataObj = {};
        try {
            await client.connect();
            const res = await client.query('SELECT * FROM users');
            userDataObj = res.rows;

            if(res.rowCount == 0) {
                return {
                    "status": "Failure",
                    "message": "Users not found!!"
                }
            }else {
                return {
                    "status": "Successful",
                    "message": "User information retrieved successfully",
                    "data": userDataObj
                }
            }
            
        } catch (err) {
            console.error(err);
        } finally {
            // client.release();
        }
    }

    async getUserById(username: String): Promise<any> {
        // @ts-ignore
        console.log(userId);
        userDataObj = {};
        try {
            await client.connect();
            const res = await client.query("SELECT * FROM users WHERE id ='" + username + "'");
            userDataObj = res.rows;

            if(res.rowCount == 0) {
                return {
                    "status": "Failure",
                    "message": "User was not found!!"
                }
            }else {
                return {
                    "status": "Successful",
                    "message": "User information retrieved successfully",
                    "data": userDataObj
                }
            }
            // return userDataObj;
        } catch (err) {
            console.error(err);
        } finally {
            // client.release();
        }
    }

    async getAllItems(): Promise<any> {
        // @ts-ignore
        itemDataObj = {};
        try {
            await client.connect();
            const resItems = await client.query('SELECT * FROM store_items');
            itemDataObj = resItems.rows;

            if(resItems.rowCount == 0) {
                return {
                    "status": "Failure",
                    "message": "Items could not be retrieved from the database. No records found"
                }
            }else {
                return {
                    "status": "Successful",
                    "message": "Record successfully retrieved from the database",
                    "data": itemDataObj
                }
            }
        } catch (err) {
            console.error(err);
        } finally {
            // client.release();
        }
    }

async addNewItems(items_Name:String,items_Description:String): Promise<any> {
    //@ts-ignore
    updateResponse = {};
    try {
        await client.connect();
        const newItems = await client.query("INSERT INTO store_items (item_name,item_description) VALUES ('" + items_Name + "','" + items_Description + "')");
        // const newItems = await client.query("INSERT INTO store_items (item_name,item_description) VALUES (" + item_Name + "," + item_Description + ")");
        updateResponse = newItems.rows;
        console.log(updateResponse);
        if(newItems.rowCount == 0) {
            return {
                "status": "Failure",
                "message": "Items could not be inserted into the database"
            }
        }else {
            return {
                "status": "Successful",
                "message": "Record successfully added into the database",
                "data": newItems.rows
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        // client.release();
    }
}
}