import express from 'express';
import {getUserByEmail} from '../services/user.service.js'
import {hashPasswordWithSalt} from '../utils/hash.js'
import {signUpPostRequestBodySchema, loginPostRequestBodySchema} from '../validation/request.validation.js'
import { dbInsert } from '../db/db.operation.js';
import {createUserToken} from '../utils/token.js'


const router  = express.Router();

router.post('/signup', async (req, res) => {
    const validationResult = await  signUpPostRequestBodySchema.safeParseAsync(req.body);

    if(validationResult.error){
        return res.status(400).json({
            error: validationResult.error.format()
        }
        )
    }

    const { firstname, lastname, email, password } = validationResult.data

    //Validation
    if(!firstname){
        return res.status(400).json({
            error: "Firstname should be filled."
        })
    }

const existingUser = await getUserByEmail(email);

if(existingUser)return res.status(400).json({
    error: `User with ${email} already exists.`
})

const { salt, hashedPassword } = hashPasswordWithSalt(password);


const [user] = await dbInsert(firstname, lastname, email, hashedPassword, salt);

return res.status(201).json({
    data: {userId: user.id},
})
});

router.post('/login', async(req, res) => {
    const validationResult = await loginPostRequestBodySchema.safeParse(req.body);

    if(validationResult.error){
        return res.status(400).json({
            error: validationResult.error
        });
    }

    const {email, password} = validationResult.data;

    const user = await getUserByEmail(email);

    if(!user){
        return res.status(404).json({error: `User with ${email} does not exists.`})
    };

    const {password: hashedPassword} = hashPasswordWithSalt(password, user.salt);

    if(user.password !== hashedPassword){
        console.log(user.password);
        console.log(password);
        return res.status(400).json({
            error: "Invalid Password"
        })
    }

    const token = await createUserToken({id: user.id});

    return res.json({
        token
    })
})



export default router;