import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";
import { EventModel } from "./event.model";

export class EventRegistrationModel extends BaseModel{
  firstName: string;
  lastName: string;
  eventId: string | EventModel;
  email: string;
  receipt: string;
  registrationDate: Timestamp | any;
}
