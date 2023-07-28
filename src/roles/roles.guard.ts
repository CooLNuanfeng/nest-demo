// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from './roles.decorator';
// import { Role } from '../enums/role.enum';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean | Promise<boolean> {
//     const requireRoles = this.reflector.get<Role[]>(
//       ROLES_KEY,
//       context.getHandler(),
//     );
//     console.log('requireRoles==>', requireRoles);
//     if (!requireRoles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     console.log(request.user);
//     // 登录后设置角色
//     // request.user = {
//     //   roles: requireRoles,
//     // };
//     const user = request.user;
//     return requireRoles.some((role) => user.roles?.includes(role));
//   }
// }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Array<string>>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    console.log('requireRoles==>', requireRoles);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('user', user);
    if (!requireRoles || user?.roles?.includes(Role.Admin)) {
      //不存在或admin角色都可以放行
      return true;
    }
    return requireRoles.some((role) => user.roles?.includes(role));
  }
}
