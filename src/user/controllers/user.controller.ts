import { Controller } from "@nestjs/common";
import { Body, Get, HttpCode, Post, Put } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";


@Controller('/:user')
export class UserController {
    constructor (private readonly userService: UserService) { }

    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<User[]> {
        return this.userService.findAll()
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create (@Body() user: User): Promise<User> {
        return await this.userService.create(user)
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update (@Body() user: User): Promise<User> {
        return await this.userService.update(user)
    }
}