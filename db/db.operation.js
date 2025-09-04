import { db } from './index.js';
import { userTable } from '../models/user.model.js';

export  async function dbInsert(firstname, lastname, email, password, salt){
const user = db.insert(userTable).values({
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