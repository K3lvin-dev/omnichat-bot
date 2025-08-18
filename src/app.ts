import express from 'express';
import dotenv from 'dotenv';
import { router } from '@/routes';
import { errorHandler } from '@/middlewares/errorHandler';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => {
});
