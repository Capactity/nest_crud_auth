import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Tags } from './entities/tags.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    @InjectRepository(Tags)
    private readonly tags: Repository<Tags>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.desc = createUserDto.desc;
    return this.user.save(data);
  }

  async findAll(query: { keyword: string; page: number; size: number }) {
    console.log((query.page - 1) * query.size);
    const data = await this.user.find({
      relations: ['tags'], // 查询关联关系数据
      // 模糊查询
      where: [{ name: Like(`%${query.keyword}%`) }],
      order: {
        id: 'DESC', // 倒序输出 asc 正序
      },
      skip: +((query.page - 1) * query.size),
      take: query.size,
    });
    const count = await this.user.count({
      where: [{ name: Like(`%${query.keyword}%`) }],
    });
    return {
      data,
      count,
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }

  async addTags(params: { tags: string[]; userId: number }) {
    const userInfo = await this.user.findOne({
      where: { id: params.userId },
    });
    const tagList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const tag = new Tags();
      tag.name = params.tags[i];
      await this.tags.save(tag);
      tagList.push(tag);
    }
    userInfo.tags = tagList;
    this.user.save(userInfo);
    return true;
  }
}
