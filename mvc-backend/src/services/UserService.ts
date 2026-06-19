import { PoolConnection } from 'mysql2'
import {db} from '../config/database'
import { User } from '../models/User'

export class UserService {
    async create(email: string, password: string){
        if(email.length == 0 || password.length == 0){
            throw new Error("Informações não podem estar vazias")
        }

        const user = new User(email, password)

        const [result] = await db.query(
            'INSERT INTO usuarios (email, password) VALUES (?,?)',
            [user.getEmail(), user.getPassword()]
        )

        return result
    }
    async findAll(){
        const [rows] = await db.query(
            "SELECT * FROM usuarios"
        )
        return rows
    }
    async findById(id: number){
        const [rows]: any = await db.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        )
        return rows[0]
    }
    async update(
        id: number,
        email: string,
        password: string
    ) {
        const [result] = await db.query(
            `UPDATE usuarios SET email = ?, password = ? WHERE id = ?`,
            [
                email,
                password,
                id
            ]
        )
        return result
    }
    async delete(id: number){
        const [result] = await db.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        )
        return result
    }
}