import { Request, Response, NextFunction } from 'express'
import { UserService } from '../services/UserService'

export class AuthController {
        async login (req: Request, res: Response, next: NextFunction){
            try{
                //precisamos extrair o email e a senha pelo corpo da requisição:
                const {email, password} = req.body // lembrem-se: sempre na ordem, e com o mesmo nome

                // Chamamos o método de login da camada services:
                const result = await UserService.login({email, password}) //lembre-se que esse método retorna um objeto com o usuário sem senha e o token

                //Enviamos o resultado, seja ele qual for, no formato json com o status 200 (OK)
                return res.status(200).json(result)
            } catch (error){
                next(error) // Chamamos assim para enviar o erro para o middleware errorHandler (next é tipo um "passa para outro resolver". O error Handler captura qualquer erro que for "lançado pro próximo")
            }
        }
    }