import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model} from 'sequelize-typescript';


@Table({ timestamps: false }) // Disable automatic timestamp columns
export class User extends Model<User> {
    @Column({ primaryKey: true, autoIncrement: true })
    id: number;

    @Column
    name: string;

    @Column
    email: string;
}
// Validate body request 