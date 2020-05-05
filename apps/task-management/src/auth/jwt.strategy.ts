import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtInterface } from './jwt-interface.model';
import { User } from './user.entity';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secret')
        });
    }

    async validate(payload: JwtInterface): Promise<User> {
        const { username } = payload;
        const user = await this.userRepository.findOne({username});

        if (!user) {
            throw new UnauthorizedException('User not found!');
        }

        return user;
    }
}