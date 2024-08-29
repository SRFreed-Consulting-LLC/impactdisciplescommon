import { Timestamp } from "firebase/firestore"
import { Address } from "./utils/address.model"
import { BaseModel } from "../base.model";

export class LunchAndLearnModel extends BaseModel{
  email: string;
  firstName: string;
  lastName: string;
  requestedDate: Timestamp;
  requestedStartDateTime: Timestamp;
  requestedEndDateTime: Timestamp;
  locationName: string;
  locationAddress: Address;
  coordinator: string ;
  coordinatorPhone: string;
}
