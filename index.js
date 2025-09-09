import 'dotenv/config'
import express from 'express';
import  userRouter from './route/user.routes.js'
import { authenticationMiddleware} from './middlewares/auth.middleware.js'
import urlRouter from './route/url.routes.js'


const app = express();

app.use(express.json());
app.use(authenticationMiddleware);

const PORT = process.env.PORT ?? 8000;

app.get('/', async(req, res) => {
    return res.json({
        status: 'Server is up and running...'
    });
})

app.use(urlRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})