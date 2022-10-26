import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {
    
    async encryptPassoword (password: string): Promise<string> {

        let heels = 10;
        return await bcrypt.hash(password, heels)

    }

    async comparePassword (bankPassoword: string, typedPassword: string): Promise<boolean> {
        return bcrypt.compareSync(typedPassword, bankPassoword);
    }
}