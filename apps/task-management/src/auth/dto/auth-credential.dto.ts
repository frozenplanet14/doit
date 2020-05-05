import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialDto {
    @IsNotEmpty() @IsString() @MinLength(4) @MaxLength(10) username: string;
    @IsNotEmpty() @IsString() @MinLength(4) @MaxLength(20)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Password is too weak'}
    ) password: string;
}