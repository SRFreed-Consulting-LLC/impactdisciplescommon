import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class MonthlyNewsletterModel extends BaseModel{
  isActive: boolean = false;
  date: Timestamp | Date;
  title: string;
  url?: string;
}
