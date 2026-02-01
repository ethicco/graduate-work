import { IGetChatListParams } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsMongoId } from 'class-validator';

export class FindSupportRequest implements IGetChatListParams {
  @ApiProperty({
    description: 'ID Пользователя',
    type: String,
    format: 'objectId',
  })
  @IsMongoId()
  userId: string | null;

  @ApiProperty({ description: 'Флаг активности чата', type: Boolean })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive: boolean;
}
