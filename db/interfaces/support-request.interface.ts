import { IMessage } from './message.interface';
import { IUser } from './user.interface';

export interface ISupportRequest {
  id: string;
  userId: string | Omit<IUser, 'role'>;
  createdAt: Date;
  messages?: Array<IMessage>;
  isActive: boolean;
}

export interface ISupportRequestCreate
  extends Pick<ISupportRequest, 'userId'>, Pick<IMessage, 'text'> {}

export interface ISendMessage extends Pick<IMessage, 'authorId' | 'text'> {
  supportRequestId: string;
}

export interface IMarkMessagesAsRead {
  userId: string;
  supportRequestId: string;
  createdBefore: Date;
}

export interface IGetChatListParams {
  userId?: string | null;
  isActive: boolean;
  limit: number;
  offset: number;
}
