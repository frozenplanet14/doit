import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtInterface } from './jwt-interface.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    signUp(userCred: AuthCredentialDto): Promise<void> {
        return this.userRepository.createUser(userCred);
    }

    async signIn(userCred: AuthCredentialDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validatePassword(userCred);

        const payload: JwtInterface = {username};
        const accessToken = this.jwtService.sign(payload);

        return {accessToken};
    }
}
