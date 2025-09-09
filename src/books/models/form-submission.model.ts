import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./base.model";

export class FormSubmissionModel extends BaseModel {
  user: string;
  book: string;
  lesson: string;
  date: Timestamp;
  submission: any;
  metadata: any;

}
