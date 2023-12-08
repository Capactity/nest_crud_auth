import { validateHeaderName } from 'http';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor( private readonly userService : UserService) {
    }

    async validateUser(name: string, password: string): Promise<any> {
        const user = await this.userService.findOne(name);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}
