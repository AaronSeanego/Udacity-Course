import express, { Response, Request} from "express";
import { Users } from "../models/users";
const bcrypt = require("bcrypt");
import client from "../database";
const jwt = require("jsonwebtoken");

const users_info = new Users();

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

const getUsers = async (_req: Request, res: Response) => {
    try {
        // const authorizationHeader = _req.headers.authorization;
        const authorizationHeader = _req.headers.authorization;
        const token = authorizationHeader?.split('')[1];
        console.log(token);
        // const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
        res.status(401);
        res.json(`Invalid token ${err}`);
        return;
    }

    try {
        const usersData = await users_info.getUserInfo(_req.body.username,_req.body.password);
        console.log(usersData.user);
        if(usersData.status == "Login Successfful") {
        }
        res.status(200).json({"status": "200", "data": usersData});
        client.release();
    } catch (err) {
        // console.error(err);
        // res.status(400);
        // res.json(err);
    }

}

const createNewUser = async (req: Request, res: Response) => {
    try {
        // let hashedPassword = await bcrypt.hash(req.body.password + "pepper", 10);
        const newUsers_Info = await users_info.createUser(req.body.username,req.body.password,req.body.email);
        console.log(newUsers_Info);
        
        var token = jwt.sign({user: newUsers_Info}, process.env.TOKEN_SECRET);
        res.status(200).json({"status": "200", "data": newUsers_Info, "token": token});
        client.release();
    } catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deleteUser_Data = await users_info.deleteUser(req.body.username);
        console.log(deleteUser_Data);
        res.status(200).json({"status": "200", "data": deleteUser_Data});
        client.release();
    } catch (err) {
        // res.status(400);
        // res.json(err);
    }
}

const users_func = (app: express.Application) => {
    app.get('/users/login', getUsers);
    app.post('/users/register', createNewUser);
    app.post('/users/deleteUser', deleteUser);
}

export default users_func;