import express from 'express';
import * as dotenv from 'dotenv';
import { connectDB } from './database';
import userRoutes from './routes/user.routes'


dotenv.config()
const app = express();
app.use(express.json())

app.set('port', process.env.PORT);
app.listen(app.get('port'),() => {
    console.log(`Server listening on port ${app.get('port')}`)
    connectDB()
});


app.use(userRoutes)