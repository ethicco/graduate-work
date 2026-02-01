import { ISupportRequestCreate } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class CreateSupportRequest implements ISupportRequestCreate {
  @ApiProperty({
    description: 'ID Пользователя',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  userId: string;

  @ApiProperty({ description: 'Сообщение пользователя', type: String })
  @IsString()
  text: string;
}
