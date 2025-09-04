import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { userTable } from '../models/user.model.js'

export async function getUserByEmail(email) {
    const [existingUser] = await db
        .select({
            id: userTable.id,
            firstname: userTable.firstname,
            lastname: userTable.lastname,
            email: userTable.email,
            salt: userTable.salt,
            password: userTable.password,
        })
        .from(userTable)
        .where(eq(userTable.email, email));

        return existingUser;
}