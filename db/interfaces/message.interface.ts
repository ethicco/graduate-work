export interface IMessage {
  id?: string;
  authorId: string | { id: string; name: string };
  sentAt: Date;
  text: string;
  readAt?: Date;
}

export interface IReadMessage {
  readAt: Date;
}

export interface IReadMessageResponse {
  success: boolean;
}
