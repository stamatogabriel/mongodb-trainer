import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from 'src/types/User';
import { CreateUserDto } from './dto/create_user.dto';
import { IUserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';
import { create } from 'domain';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return (await this.userModel.create(createUserDto)).populate('parentId');
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findAll(query: QueryDto) {
    try {
      let data = {};

      if (query.email) data = { ...data, email: query.email };

      return await this.userModel
        .find(data)
        .populate('parentId')
        .skip(+query.page - 1 || 0)
        .limit(+query.limit || 10);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findById(id: string) {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async findByUUid(uuid: string) {
    try {
      return await this.userModel.findOne({ id: uuid });
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  async delete(id: string) {
    try {
      return await this.userModel.findByIdAndDelete(id).lean().exec();
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
