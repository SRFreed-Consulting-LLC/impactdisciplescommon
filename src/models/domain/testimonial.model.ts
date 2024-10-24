import { Timestamp } from 'firebase/firestore';
import { BaseModel } from '../base.model';
import { TESTIMONIAL_TYPES } from 'impactdisciplescommon/src/lists/testimonial_types.enum';

export class TestimonialModel extends BaseModel {
  isActive: boolean = false;
  title?: string;
  author: string;
  quote?: string;
  text: string;
  date: Timestamp;
  type: TESTIMONIAL_TYPES;
}
