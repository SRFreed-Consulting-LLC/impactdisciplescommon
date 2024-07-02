import { TrainingModel } from './training.model';
import { BaseModel } from "../base.model";
import { CoachModel } from "./coach.model";
import { TrainingRoomModel } from "./training-room.model";
import { Timestamp } from '@google-cloud/firestore';
import { AppUser } from '../admin/appuser.model';

export class TrainingSessionModel extends BaseModel {
  time: Timestamp;
  coach: CoachModel;
  trainingRoom: TrainingRoomModel
  training: TrainingModel;
  attendees: AppUser[];
}
