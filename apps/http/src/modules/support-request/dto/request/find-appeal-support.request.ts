import { IGetChatListParams } from '@/db';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class FindAppealSupportRequest implements Omit<
  IGetChatListParams,
  'userId'
> {
  @ApiProperty({ description: 'Флаг активности чата', type: Boolean })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Кол-во записей', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  limit: number;

  @ApiProperty({ description: 'Номер страницы', type: Number })
  @Transform(({ value }) => +value)
  @IsInt()
  offset: number;
}
