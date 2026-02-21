import { UserRoleEnum } from '@/db';

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  role: UserRoleEnum;
  iat: number;
  exp: number;
};
