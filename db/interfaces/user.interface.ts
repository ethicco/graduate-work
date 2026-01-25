import { RoleEnum } from '../enums';

export interface ISearchUserParams {
  limit: number;
  offset: number;
  email: string;
  name: string;
  contactPhone: string;
}

export interface IUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  contactPhone: string;
  role: RoleEnum;
}

export interface IUserCreate extends Omit<IUser, 'id'> {}

export interface IUSerUpdate extends Partial<Omit<IUser, 'id'>> {}
