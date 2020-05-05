import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) userCred: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(userCred);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) userCred: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(userCred);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}
