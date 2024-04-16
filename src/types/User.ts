import { Address } from './Address';
import { Roles } from './Roles';

export interface User {
  _id?: string;
  name: string;
  cpf: string;
  rg?: string;
  email: string;
  phone: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  address: Address;
  roles: Roles[];
}

export type Auth = {
  user: User;
  access_token: string;
};
