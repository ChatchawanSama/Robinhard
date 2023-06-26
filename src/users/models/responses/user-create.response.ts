import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserCreateResponse {
    id: number;
    name: string;
    email: string;
}