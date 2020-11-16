import { IsString } from "class-validator";

export default class UserDto {
  @IsString()
  public user_name!: string;

  @IsString()
  public tweet!: string;
}
