import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';


export const GetUser = createParamDecorator((_data: unknown, req): User => {
    // console.log(ctx);
    // const req = ctx.switchToHttp().getRequest();
    return req.user;
});