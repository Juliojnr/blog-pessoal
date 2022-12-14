import { Controller } from "@nestjs/common";
import { Body, Get, HttpCode, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger/dist";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { User } from "../entities/user.entity";
import { UserService } from "../services/user.service";

@ApiTags('User')
@Controller('/:user')
export class UserController {
    constructor (private readonly userService: UserService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update (@Body() user: User): Promise<User> {
        return await this.userService.update(user)
    }
}