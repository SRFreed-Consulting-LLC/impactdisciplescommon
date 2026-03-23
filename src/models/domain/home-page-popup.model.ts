import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';
import { ImageModel } from '../utils/image.model';

export class HomePagePopupModel extends BaseModel {
  isActive: boolean = false;
  fromDate: Timestamp;
  toDate: Timestamp;
  image?: ImageModel;
  title: string;
  text?: string;
}
