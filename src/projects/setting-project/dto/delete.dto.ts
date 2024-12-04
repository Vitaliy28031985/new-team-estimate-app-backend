import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteAllowDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  email: string;
}
