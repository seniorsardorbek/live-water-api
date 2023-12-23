import { SetMetadata } from '@nestjs/common';

export const REQUERED_ROLES = 'requiredRoles';
export const SetRoles = (...roles: string[]) =>
  SetMetadata(REQUERED_ROLES, roles);
