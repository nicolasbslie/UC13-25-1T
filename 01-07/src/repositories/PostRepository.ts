import { AppDataSource } from '../config/data-source';
import { Post } from '../models/Post';

const repository = AppDataSource.getRepository(Post);

export const PostRepository = {
    // Busca todos os posts, incluindo os dados do usuário dono de cada post.
    async findAll() {
        return repository.find({ relations: ['user'] });
    },

    async findById(id: number) {
        return repository.findOne({
            where: { id },
            relations: ['user'],
        });
    },

    create(data: Partial<Post>) {
        return repository.create(data);
    },

    async delete(id: number) {
        const user = await PostRepository.delete(id)

        if(user.affected === 0){
            throw new NotFoundError("Usuário não encontrado")
        }
    },
};