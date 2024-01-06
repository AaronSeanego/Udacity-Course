import express, { Response, Request} from "express";
import dotenv from 'dotenv';
const {Client} = require('pg');
import client from "./database";
const bcrypt = require('bcrypt');

dotenv.config();

const app = express.Router();
let allUsers = [];

const hash = bcrypt.hash(process.env.BCRYPT_PASSWORD + "pepper", process.env.SALT_ROUNDS, function(err:any, hash:any) {
    console.log(hash);
});

// function getPassword() {
//     // const hash = bcrypt.hashSync(process.env.BCRYPT_PASSWORD + "pepper", parseInt(process.env.SALT_ROUNDS:String))
//     const hash = bcrypt.hash(process.env.BCRYPT_PASSWORD + "pepper", process.env.SALT_ROUNDS, function(err:any, hash:any) {
//         console.log(hash);
//     });
// }

async function authenticate(username:String, password:String): Promise<any> {
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);

    if(result.rows.length) {
        const user = result.rows[0];
    }
}
// export default logPage;