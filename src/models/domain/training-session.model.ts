import { CourseModel } from './course.model';
import { BaseModel } from "../base.model";
import { CoachModel } from "./coach.model";
import { TrainingRoomModel } from "./training-room.model";
import { Timestamp } from '@google-cloud/firestore';
import { AppUser } from '../admin/appuser.model';
import { EventModel } from './event.model';

export class TrainingSessionModel extends BaseModel {
  name: string;
  time: Timestamp;
  coach: CoachModel;
  trainingRoom: TrainingRoomModel;
  course: CourseModel;
  attendees: AppUser[];
}
