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
}
