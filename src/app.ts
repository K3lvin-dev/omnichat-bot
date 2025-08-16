import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Olá, mundo! Nosso chatbot de cinema está no ar!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});