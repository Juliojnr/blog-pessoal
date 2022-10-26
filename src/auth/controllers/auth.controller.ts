import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { UserLogin } from "../entities/userlogin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/logar')
    @HttpCode(HttpStatus.OK)
    async login (@Body() user: UserLogin): Promise<any> {
        return await this.authService.login(user)
    }
}