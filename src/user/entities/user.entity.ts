import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tags } from './tags.entity';
import * as bcrypt from 'bcryptjs';
@Entity()
export class User {
  @PrimaryGeneratedColumn() // id自增
  id: number;
  @Column()
  name: string;
  @Column({ length: 255 })
  password: string;
  @Column()
  desc: string;
  @OneToMany(() => Tags, (tags) => tags.user) // 一对多关系
  tags: Tags[];
  @BeforeInsert()
  async hashPassword() {
    // 密码散列
    this.password = await bcrypt.hash(this.password, 10);
  }
}
