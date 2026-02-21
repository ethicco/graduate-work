import { ApiProperty } from '@nestjs/swagger';

export class ReadMessageResponse {
  @ApiProperty({ description: 'Сообщение прочитано.' })
  success: boolean;
}
