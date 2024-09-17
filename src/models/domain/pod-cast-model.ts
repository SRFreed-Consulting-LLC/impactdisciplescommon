import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class PodCastModel extends BaseModel{
  title: string;
  date: Timestamp | Date | null;
  subject: string;
  url: string;
  thumbnail: any | null;
}
