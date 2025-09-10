import express from 'express';
import {shortenPostRequestBodySchema} from '../validation/request.validation.js'
import {nanoid} from 'nanoid'
import {dbInsertURL} from '../db/db.operation.js'
import {ensureAuthenticated} from '../middlewares/auth.middleware.js'
import {urlsTable} from '../models/url.model.js'

const router = express.Router();

router.post('/shorten',ensureAuthenticated, async function (req, res) {
    
const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

if(validationResult.error)return res.status(400).json({
    error: validationResult.error.format()
})

const {url, code} = validationResult.data

const shortCode =  code ?? nanoid(6);

const [result] = await dbInsertURL(req, shortCode, url);


return res.status(201).json({
    id: result.id, 
    shortCode: result.shortCode, 
    targetURL: result.targetUrl
})
})

export default router;