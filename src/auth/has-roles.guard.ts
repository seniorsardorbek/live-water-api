import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { REQUERED_ROLES } from './set-roles.decorator';

@Injectable()
export class HasRole implements CanActivate {
  constructor(private reflector: Reflector) { }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const roles = this.reflector.getAllAndOverride<string[]>(REQUERED_ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);
    const hasRole = roles.find((role) => role === request['user'].role);
    if (!hasRole) {
      throw new ForbiddenException('Ruxsatga ega emassiz.');
    }
    return true;
  }
}
