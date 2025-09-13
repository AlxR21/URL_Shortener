import { db } from './index.js';
import { userTable } from '../models/user.model.js';
import {urlsTable} from '../models/url.model.js'

export  async function dbInsert(firstname, lastname, email, password, salt){
const user = await db.insert(userTable).values({
    firstname,
    lastname,
    email,
    password,
    salt,
}).returning({
    id: userTable.id,
});
return user;
}

export async function dbInsertURL(req, shortCode, url){
    return await db.insert(urlsTable).values({
        shortCode,
        targetURL: url,
        userId: req.user.id
    }).returning({
        id: urlsTable.id, 
        shortCode: urlsTable.shortCode, 
        targetUrl: urlsTable.targetURL
    });


}