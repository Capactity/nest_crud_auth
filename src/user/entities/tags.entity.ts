import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Tags {
  @PrimaryGeneratedColumn() // id自增
  id: number;
  @Column()
  name: string;
  @ManyToOne(() => User)
  user: User;
}
