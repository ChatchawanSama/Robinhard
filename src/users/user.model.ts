import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model } from 'sequelize-typescript';
@Table
export class User extends Model {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    name: string;

    @Column
    email: string;
}
