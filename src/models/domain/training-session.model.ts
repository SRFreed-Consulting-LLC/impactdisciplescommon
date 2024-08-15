import { CourseModel } from './course.model';
import { BaseModel } from "../base.model";
import { CoachModel } from "./coach.model";
import { TrainingRoomModel } from "./training-room.model";

export class TrainingSessionModel extends BaseModel {
  name: string;
  eventId: string;
  coach: CoachModel;
  trainingRoom: TrainingRoomModel;
  course: CourseModel;
  isReusable: boolean;
  requiresSignup: boolean;
}
