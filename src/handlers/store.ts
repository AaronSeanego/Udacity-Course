import express, { Response, Request} from "express";
import { StorefrontStore } from "../models/store_front";
import fs from "fs";
import client from "../database";
const jwt = require("jsonwebtoken");

const store = new StorefrontStore();

const viewPage = async (_req:Request, res:Response) => {
    console.log(store.getViewPage());
    let file_name = store.getViewPage();
    // res.sendFile(__dirname + store.getViewPage());
    res.send("../Storefront_App/dist" + store.getViewPage());
    // res.json(file_name);
}

const allUsers = async (_req:Request, res:Response) => {
    try {
        const users = await store.getAllUsers();
        console.log(users);
        res.send(users);
        client.release();
    }catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const allItems = async (_req:Request, res:Response) => {
    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }
    
    try {
        const items = await store.getAllItems();
        res.status(200).send(items);
        client.release();
    }catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const userbyId = async (req:Request, res:Response) => {
    try {
        const user = await store.getUserById(req.body.username);
        // res.send(user);
        res.status(200).json(user);
        client.release();
    }catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const addnewItems = async (_req:Request, res:Response) => {

    try {
        jwt.verify(_req.body.token, process.env.TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }

    try {
        const newItem = await store.addNewItems(_req.body.itemName, _req.body.itemDescription);
        // res.send(newItem);
        res.status(200).json({"status code": 200, newItem});
        client.release();
    }catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const storefrontroutes = (app: express.Application) => {
    app.get('/', (_req:Request, res:Response) => {
        const data = "</h2>Express Server Is Running!!!</h2>"
        res.send(data);
    });
    app.get('/users', allUsers);
    app.get('/users/userById', userbyId);

    app.get('/items/allTimes', allItems);
    app.post('/items/addNewItems', addnewItems);
}

export default storefrontroutes;