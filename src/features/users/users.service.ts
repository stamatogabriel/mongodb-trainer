import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create_user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';
import { HmacSHA512 } from 'crypto-js';
import { RedefinePassDto } from './dto/redefine-pass.dto copy';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UsersRepository) {}
}
