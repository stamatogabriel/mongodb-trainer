import { Schema, Document, Types } from 'mongoose';
import { User } from '../types/User';
import { HmacSHA512 } from 'crypto-js';
import { v4 as uuid } from 'uuid';

// export interface User {
//   _id?: string;
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   passwordResetToken?: string;
//   passwordResetExpires?: Date;
// }

export const UserSchema = new Schema({
  id: { type: String },
  parentId: [{ type: Types.ObjectId, ref: 'User' }],
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

UserSchema.pre<IUserEntity>('save', function (next) {
  this.id = uuid();

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

export interface IUserEntity extends Omit<User, '_id'>, Document {
  id: string;
}
