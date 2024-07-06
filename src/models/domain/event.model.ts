import { LocationModel } from './location.model';
import { BaseModel } from "../base.model";
import { AppUser } from '../admin/appuser.model';
import { Timestamp } from '@google-cloud/firestore';
import { TrainingSessionModel } from './training-session.model';
import { OrganizationModel } from './organization.model';

export class EventModel extends BaseModel {
  eventName: string;
  organization: OrganizationModel;
  startDate: Timestamp;
  endDate: Timestamp;
  location: LocationModel;
  attendees: AppUser[];
  trainingSessions: TrainingSessionModel[];

}
