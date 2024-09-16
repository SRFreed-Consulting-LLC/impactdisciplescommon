import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';

export class MailModel extends BaseModel {
  date: Timestamp;
  to: string;
  message: MailMessageModel;
}

export class MailMessageModel{
  subject: string;
  text: string;
  date: Timestamp;
}
