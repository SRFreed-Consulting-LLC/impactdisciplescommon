import { AppUser } from "../admin/appuser.model";
import { BaseModel } from "../base.model";
import { EventModel } from "./event.model";

export class EventRegistrationModel extends BaseModel{
  registrant: AppUser;
  event: EventModel;
  receipt: string;
}
