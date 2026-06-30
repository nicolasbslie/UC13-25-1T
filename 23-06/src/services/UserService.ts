import { UserRepository } from "../repositories/UserRepository"
import { AppError } from "../errors/error-handler"

export class UserService {
    private repo = new UserRepository()

    async getAllUsers() {
        try {
            const users = await this.repo.findAll()
            if(users && users == null) throw new AppError('Nenhum usuário cadastrado', 404)

            return users
        } catch {
            throw new AppError('Erro ao buscar usuários', 500)
        }
    }
    
    async registerUser(nome: string, email: string, senha: string){
        try{
            const userAlreadyExist = this.repo.findByEmail(email)
            if(userAlreadyExist != null) throw new AppError('Email já cadastrado', 409)

            const user = new User(undefined, nome, email, senha)

            const newUser = await this.repo.create(user)

            if(newUser == null) throw new AppError('Erro ao cadastrar usuário!', 500)
        } catch {
            
        }
    }
}