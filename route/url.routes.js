import express from 'express';
import {shortenPostRequestBodySchema} from '../validation/request.validation.js';
import {nanoid} from 'nanoid'
import {dbInsertURL} from '../db/db.operation.js';
import {ensureAuthenticated, authenticationMiddleware} from '../middlewares/auth.middleware.js';
import {db} from '../db/index.js'
import { urlsTable } from '../models/url.model.js';
import {and, eq} from 'drizzle-orm';

const router = express.Router();

router.post('/shorten',ensureAuthenticated, async function (req, res) {
    
const validationResult = await shortenPostRequestBodySchema.safeParseAsync(req.body);

if(validationResult.error)return res.status(400).json({
    error: validationResult.error.format()
})

const {url, code} = validationResult.data

const shortCode =  code ?? nanoid(6);

const [result] = await dbInsertURL(req, shortCode, url);

const validity = 30

return res.status(201).json({
    id: result.id, 
    shortCode: result.shortCode, 
    // targetURL: result.targetUrl,
    validity: validity
})
});

router.get('/codes', ensureAuthenticated, async function(req, res) {
    const codes = await db
    .select({
        shortCode: urlsTable.shortCode,
        targetURL: urlsTable.targetURL
    })
    .from(urlsTable)
    .where(eq(urlsTable.userId, req.user.id));

    return res.status(200).json({codes});
});

router.post('/:id', ensureAuthenticated, async function (req, res) {
    const urlId = req.params.id;
    const newTargetUrl = req.body.newTargetUrl;
    console.log(urlId, newTargetUrl);
    
    await db
    .update(urlsTable)
    .set({targetURL: newTargetUrl})
    .where(
        and(
        (eq(urlsTable.id, urlId)),
        (eq(urlsTable.userId, req.user.id))
        )
    )

    return res.status(200).json({
        message: "URL successfully updated",
    })
})
router.delete('/:id', ensureAuthenticated, async function (req, res){
    const id = req.params.id
    await db.delete(urlsTable)
    .where(and(
        (eq(urlsTable.id, id)),
        (eq(urlsTable.userId, req.user.id))
              )
          );

    return res.status(200).json({
        message: "Successfully deleted your Shortened URL."
    })
})

router.get('/:shortCode', async function (req, res) {
    const code = req.params.shortCode;

    const [result] =await db.select({
        targetURL: urlsTable.targetURL,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

    if(!result){
        return res.status(400).json({
            error: "An Invalid URL"
        })
    }

    return res.redirect(result.targetURL);
})

export default router;