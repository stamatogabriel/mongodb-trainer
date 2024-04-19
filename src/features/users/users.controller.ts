import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from './dto/update_user.dto';
import { QueryDto } from './dto/query_user.dto';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt.guard';
import { Roles as ImportedRoles } from 'src/types/Roles';
import { HasRoles } from 'src/core/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/core/auth/guards/roles.guard';
import { ForgotPassDto } from './dto/reset-pass.dto';
import { RedefinePassDto } from './dto/redefine-pass.dto copy';

@ApiTags('Users')
// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly user: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.user.create(createUserDto);
  }

  @Get()
  async findAll(@Query() query: QueryDto) {
    return this.user.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.user.findById(id);
  }

  @Get('uuid/:uuid')
  async findByUUid(@Param('uuid') uuid: string) {
    return this.user.findByUUid(uuid);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.user.delete(id);
  }
}
