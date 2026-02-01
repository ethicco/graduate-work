export interface IMessage {
  authorId: string;
  sentAt: Date;
  text: string;
  readAt?: Date;
}
