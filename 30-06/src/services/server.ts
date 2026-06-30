import  express  from 'express';
import * as dotnev from 'dotenv';
import { AppDataSource } from '../config/data-source';
import { error } from 'node:console';

const app = express()
dotnev.config()

const PORT = process.env.PORT // Pega o valor da variável PORT que está no .env

AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso!")

    app.listen(PORT, () => {
        console.log("Servidor backend no ar!")
    })
}).catch((error) => console.log("Erro ao conectar com o banco " + error))