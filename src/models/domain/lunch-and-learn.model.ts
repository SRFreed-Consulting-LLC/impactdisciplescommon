import { Timestamp } from "firebase/firestore"
import { Address } from "./utils/address.model"
import { BaseModel } from "../base.model";
import { Phone } from "./utils/phone.model";

export class LunchAndLearnModel extends BaseModel{
  date: Timestamp;
  email: string;
  firstName: string;
  lastName: string;
  requestedDate: Timestamp;
  requestedStartDateTime: Timestamp;
  requestedEndDateTime: Timestamp;
  locationName: string;
  locationAddress: Address;
  coordinator: string;
  coordinatorPhone: Phone;
}
