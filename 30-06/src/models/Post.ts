import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

// @Entity('posts') indica que esta classe representa a tabela "posts".
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    title: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}