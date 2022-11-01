import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Postagem } from "../../postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: 'tb_user'})
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    public id: number 

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public name: string

    @IsEmail()
    @Column({length: 255, nullable: false})
    @ApiProperty({example: 'email@email.com'})
    public user: string

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    @ApiProperty()
    public password: string

    @Column({length: 5000})
    @ApiProperty()
    public photo: string

    @ApiProperty()
    @OneToMany(() => Postagem, (postagem) => postagem.user)
    postagem: Postagem[];

}