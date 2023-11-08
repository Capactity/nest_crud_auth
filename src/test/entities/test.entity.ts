import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Test {
  @PrimaryGeneratedColumn() // id自增
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ select: true, default: '1234', comment: '注释', nullable: true }) // 表查询时不会返回给用户
  password: string;
  @Column()
  age: number;
  @Generated('uuid') // 自动生成uuid
  uuid: string;
  @CreateDateColumn({ type: 'timestamp' }) // 自动生成时间
  createDate: Date;
  @Column({
    type: 'enum',
    enum: ['male', 'female'],
    default: 'male',
  })
  sex: string;
  @Column('simple-array')
  email: string;
  @Column('simple-json')
  json: { name: string; age: number };
}
