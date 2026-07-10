import { AppDataSource } from "../config/data-source";
import { Post } from "../models/Post";
import { User } from "../models/User";


const repo = AppDataSource.getRepository(Post)

export const PostRepository = {
   
    //Encontra TODOS os posts PARA TODO MUNDO
    async findAll() {
        
        return repo.find({relations: ['user']})
    },

    // Encontra um post através do id dele
    async findById(id:number){
        return repo.findOne({where:{id}, relations:['user']})
    },

    //Este método encontra TODOS os posts de um usuário específico
    async findByUserId(userId:number){
        return repo.find({where: {user: {id:userId}}, relations: ['user']})
    },
    
    async create(data: { id?: number; title: string; user: User }) {
        const post = repo.create(data);
        return repo.save(post);
      },

    async delete(id:number){
        return repo.delete(id)
    }
}