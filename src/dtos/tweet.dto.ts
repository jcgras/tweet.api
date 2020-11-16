import { IsString } from "class-validator";

export default class TweetDto {
  @IsString()
  public user_name!: string;

  @IsString()
  public tweet!: string;
}
