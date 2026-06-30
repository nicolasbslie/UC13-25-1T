import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
import { Jogador } from '../models/Jogador';
import { Selecao } from '../models/Selecao';
dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT || "3306"),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Jogador, Selecao],
});