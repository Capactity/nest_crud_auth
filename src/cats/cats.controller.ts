import { Controller, Post, Query, Body, Param } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CatsService } from './cats.service';
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  getCats(): any {
    this.catsService.getCats();
  }

  @Post('/create')
  createCats(@Body() body: any): any {
    // 创建一个猫
    console.log(body);
    this.catsService.createCat();
  }

  @Get('/getCatsById')
  getCatsById(@Query('id') id: number): any {
    this.catsService.getCatsById(id);
  }

  @Get('/findCatsById/:id/:name')
  findCatsById(@Param() param): any {
    console.log(param);
    this.catsService.getCatsById(param.id);
  }
}
