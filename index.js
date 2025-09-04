import express from 'express';
import  userRouter from './route/user.routes.js'


const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 8000;

app.get('/', async(req, res) => {
    return res.json({
        status: 'Server is up and running...'
    });
})

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})