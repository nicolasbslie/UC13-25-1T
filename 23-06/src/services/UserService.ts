import { UserRepository } from "../repositories/UserRepository"
import { AppError } from "../errors/error-handler"

export class UserService {
    private repo = new UserRepository()

    async getAllUsers() {
        try {
            
        } catch {
            throw new AppError('Erro ao buscar usuários', 500)
        }
    }
}