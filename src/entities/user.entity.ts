import { Schema, Document } from 'mongoose';
import { Roles } from '../types/Roles';
import { User } from '../types/User';
import { HmacSHA512 } from 'crypto-js';

export const UserSchema = new Schema({

});

UserSchema.pre<IUserEntity>(['save'], function (next) {
  if (this.password) {
    const hashPassword = HmacSHA512(
      this.password,
      process.env.PASSWORD_SALT,
    ).toString();

    this.password = hashPassword;
  }
  next();
});

UserSchema.pre<any>('findOneAndUpdate', function (next) {
  const password = this.getUpdate().password;
  if (password) {
    const hashPassword = HmacSHA512(
      password,
      process.env.PASSWORD_SALT,
    ).toString();
    this.getUpdate().password = hashPassword;
  }
  next();
});

export interface IUserEntity extends Omit<User, '_id'>, Document {}
