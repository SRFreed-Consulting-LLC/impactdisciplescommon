import { LocationModel } from './location.model';
import { BaseModel } from "../base.model";
import { AppUser } from '../admin/appuser.model';
import { Timestamp } from '@google-cloud/firestore';
import { OrganizationModel } from './organization.model';
import { AgendaItem } from './utils/agenda-item.model';

export class EventModel extends BaseModel {
  eventName: string;
  organization: OrganizationModel;
  startDate: Timestamp;
  endDate: Timestamp;
  location: LocationModel;
  attendees: AppUser[];
  agendaItems: AgendaItem[];
  costInDollars: number;
}
