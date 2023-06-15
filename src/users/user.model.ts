import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model} from 'sequelize-typescript';


@Table({ timestamps: false }) // Disable automatic timestamp columns
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true })
    @ApiProperty()
    id: number;

    @Column
    @ApiProperty()
    name: string;

    @Column
    @ApiProperty()
    email: string;
}