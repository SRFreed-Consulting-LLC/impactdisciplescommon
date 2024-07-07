import { CourseModel } from './course.model';
import { BaseModel } from "../base.model";
import { CoachModel } from "./coach.model";
import { TrainingRoomModel } from "./training-room.model";
import { Timestamp } from '@google-cloud/firestore';
import { AppUser } from '../admin/appuser.model';

export class TrainingSessionModel extends BaseModel {
  name: string;
  eventId: string;
  coach: CoachModel;
  trainingRoom: TrainingRoomModel;
  course: CourseModel;
  attendees: AppUser[];
}
