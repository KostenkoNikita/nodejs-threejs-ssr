import express from 'express';
import { indexRouter } from "./controllers";

const app = express();

app.use(indexRouter)

app.listen(3000, function () {
    console.log('Listening on port 3000...')
});