import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity({name: 'tb_user'})
export class User {

    @PrimaryGeneratedColumn()
    public id: number 

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public name: string

    @IsEmail()
    @Column({length: 255, nullable: false})
    public user: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    public password: string

    @Column({length: 5000})
    public photo: string

    @OneToMany(() => Postagem, (postagem) => postagem.user)
    postagem: Postagem[];

}