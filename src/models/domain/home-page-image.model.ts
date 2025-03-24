import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';

export class HomePageImageModel extends BaseModel {
  isActive: boolean = false;
  url?: string;
  title: string;
  text?: string;
  side: string;
  date: Timestamp;
}
