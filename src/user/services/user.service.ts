import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";



@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcrypt: Bcrypt
    ) {}

    async findByUser (user: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                user: user
            }
        })
    }

    async findAll (): Promise<User[]> {
        return await this.userRepository.find ({
            relations: {
                postagem: true
            }
        })
    }

    async findById(id: number): Promise<User> {
        
        let user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                postagem: true
            }
        });

        if (!user)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)
        return user;
    }

    async create (user: User): Promise<User> {
        
        let searchUser = await this.findByUser(user.user)

        if(!searchUser) {
            user.password = await this.bcrypt.encryptPassoword(user.password)
        return await this.userRepository.save(user);
        }

        throw new HttpException('O usuario já existe', HttpStatus.BAD_REQUEST)
    }

    async update (user: User): Promise<User> {

        let updateUser: User = await this.findById(user.id)
        let searchUser = await this.findByUser(user.user)

        if (!updateUser)
            throw new HttpException('Usuario não encontrado!', HttpStatus.NOT_FOUND)
        
        if (searchUser && searchUser.id != user.id)
            throw new HttpException('Usuário (e-mail) ja cadastrado', HttpStatus.BAD_REQUEST)
        
        user.password = await this.bcrypt.encryptPassoword(user.password)
        return await this.userRepository.save(user);

    }

}