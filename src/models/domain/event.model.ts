import { LocationModel } from './location.model';
import { BaseModel } from "../base.model";
import { AppUser } from '../admin/appuser.model';
import { Timestamp } from '@google-cloud/firestore';
import { OrganizationModel } from './organization.model';
import { AgendaItem } from './utils/agenda-item.model';
import { FAQModel } from '../utils/faq.model';

export class EventModel extends BaseModel {
  isActive: boolean = false;
  eventName?: string;
  organization?: string | OrganizationModel;
  startDate?: Timestamp;
  endDate?: Timestamp;
  location?: string | LocationModel;
  attendees?: AppUser[];
  agendaItems?: AgendaItem[];
  description?: string;
  costInDollars?: number;
  isSummit?: boolean = false;
  imageUrl?: any;
  emailTemplate?: string;
  videoId?: string;
  faqList: FAQModel[] = [];
  checkIn?: Timestamp;
}
