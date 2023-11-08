import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CatsService {
  getCats(): any {
    return {
      code: 0,
      data: ['1', '2', '3'],
      msg: 'success',
    };
  }

  createCat(): any {
    return {
      code: 0,
      data: {
        id: 1,
        name: 'tom',
      },
      msg: 'success',
    };
  }

  getCatsById(id: number): any {
    const data = [].find((item) => item.id === id);
    if (!data) {
      throw new NotFoundException('cat not found'); // 接口抛异常
    }
    return {
      code: 0,
      data: {
        id: 1,
        name: 'tom',
      },
    };
  }
}
