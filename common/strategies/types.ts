import { RoleEnum } from '@/db';

export type JwtPayload = {
  id: string;
  email: string;
  name: string;
  role: RoleEnum;
  iat: number;
  exp: number;
};
