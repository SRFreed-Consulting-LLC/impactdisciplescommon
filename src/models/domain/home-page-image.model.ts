import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';
import { ImageModel } from '../utils/image.model';

export class HomePageImageModel extends BaseModel {
  isActive: boolean = false;
  order: number;
  image?: ImageModel;
  title: string;
  text?: string;
  side: string;
  ctaVisible: boolean;
  ctaTitle: string;
  ctaDestination: string;
  date: Timestamp;
}
