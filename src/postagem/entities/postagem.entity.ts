import { IsNotEmpty } from "class-validator";
import { Tema } from "../../tema/entities/tema.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'tb_postagens'})
export class Postagem {
   
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    titulo: string;

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    @ApiProperty()
    texto: string;

    @UpdateDateColumn()
    @ApiProperty()
    data: Date;

    @ApiProperty({type: () => Tema})
    @ManyToOne(() => Tema, (tema) => tema.postagem, {
        onDelete: "CASCADE"
    })
    tema: Tema;

    @ApiProperty({type: () => User})
    @ManyToOne(() => User, (user) => user.postagem, { 
        onDelete: "CASCADE"
})
user: User
}