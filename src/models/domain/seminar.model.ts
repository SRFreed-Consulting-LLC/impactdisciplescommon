import { Timestamp } from "firebase/firestore"
import { Address } from "./utils/address.model"
import { BaseModel } from "../base.model";
import { Phone } from "./utils/phone.model";

export class SeminarModel extends BaseModel{
  requestedSeminarDate: Timestamp;
  requestedStartDateTime: Timestamp;
  requestedEndDateTime: Timestamp;
  preferredTrainer: string;
  preferredLocationName: string;
  preferredLocation: Address;
  eventCoordinator: string;
  email: string;
  phone: Phone;
  hasProjectingDevice: boolean;
  volunteersAvailable: boolean;
  isPrivateEvent: boolean;
  isPersonalRegistration: boolean;
  requestedTicketPrice: number;
  isLunchProvided: boolean;
  isLunchIncluded: boolean;
  comments: string | null;
}
