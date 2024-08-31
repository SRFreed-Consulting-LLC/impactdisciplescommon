import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class PodCastModel extends BaseModel{
  title: string;
  date: Timestamp | null;
  subject: string;
  url: string;
  thumbnail: string | null;
}
