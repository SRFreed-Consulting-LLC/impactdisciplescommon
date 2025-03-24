import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';
import { ImageModel } from '../utils/image.model';

export class HomePageImageModel extends BaseModel {
  isActive: boolean = false;
  image?: ImageModel;
  title: string;
  text?: string;
  side: string;
  date: Timestamp;
}
