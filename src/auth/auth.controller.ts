import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: auth) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/add/tags')
  AddTags(@Body() params: { tags: string[]; userId: number }) {
    return this.userService.addTags(params);
  }

  @Get()
  findAll(@Query() query: { keyword: string; page: number; size: number }) {
    return this.userService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
