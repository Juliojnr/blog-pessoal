import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "src/tema/controller/tema.controller";
import { TemaService } from "src/tema/services/tema.service";
import { TemaModule } from "src/tema/tema.module";
import { PostagemControler } from "./controllers/postagem.controller";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
    providers: [PostagemService, TemaService],
    controllers: [PostagemControler],
    exports: [TypeOrmModule]
})

export class PostagemOrmModule {}