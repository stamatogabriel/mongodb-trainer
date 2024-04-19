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

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    if (!user) {
      throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findAll(query: QueryDto) {
    return await this.userRepository.findAll(query);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByUUid(uuid: string) {
    return await this.userRepository.findByUUid(uuid);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
}
