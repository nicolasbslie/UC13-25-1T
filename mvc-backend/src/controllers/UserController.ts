import { Request, Response } from "express";
import { UserService } from "../services/UserService";
export class UsuarioContoller{
    private service = new UserService()
    async createUsuario(
        req: Request,
        res: Response
    ) {
        try{
            const{email, password} = req.body
            if(!email || !password){
                return res.status(400).json({
                    mensagem: "Email e senha são obrigatórios"
                })
            }
            await this.service.create(
                email,
                password
            )
            return
        } catch {
            return res.status(500).json({
                mensagem: "Erro interno"
            })
        }
    }
    async listUsuarios(
        req: Request,
        res: Response
    ) {
        try{
            const usuarios = await this.service.findAll()
            return res.status(200).json(
                usuarios
            )
        } catch{
            return res.status(500).json({
                mensagem: "Erro interno"
            })
        }
    }
    async getUsuario(
        req: Request,
        res: Response
    ){
        try{
            const id = Number(
                req.params.id
            )
            const usuario = await this.service.findById(id)
            if(!usuario){
                return res.status(404).json({
                    mensagen: "Usuário não encontrado"
            })
            }
            return res.status(200).json(
                usuario
            )
        } catch{
            return res.status(500).json({
                mensagem: "Erro interno"
            })
        }
    }
    async updateUsuario(
        req: Request,
        res: Response
    ){
        try{
            const id = Number(
                req.params.id
            )
            const {email, password} = req.body
            await this.service.update(
                id, email, password
            ) 
            return res.status(200).json({
                mensagem: "Usuário atualizado com sucesso"
            })
        } catch{
            return res.status(500).json({
                mensagem: "Erro interno"
            })
        }
    }
    async deleteUsuario(
        req: Request,
        res: Response
    ){
        try{
            const id = Number(
                req.params.id
            )
            await this.service.delete(id)
            return res.status(204).send()
        } catch {
            return res.status(500).json({
                mensagem: "Erro interno"
            })
        }
    }
}