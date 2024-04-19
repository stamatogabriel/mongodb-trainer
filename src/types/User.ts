import { Address } from './Address';
import { Roles } from './Roles';

export interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  // address: Address;
  // roles: Roles[];
}

export type Auth = {
  user: User;
  access_token: string;
};
