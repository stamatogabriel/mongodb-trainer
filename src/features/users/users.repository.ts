import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/types/User';
import { CreateUserDto } from './dto/create_user.dto';
import { IUserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserEntity>,
  ) {}
}
