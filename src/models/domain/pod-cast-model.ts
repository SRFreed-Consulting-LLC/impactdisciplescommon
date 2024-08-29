import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class PodCastModel extends BaseModel{
  title: string;
  date: Timestamp | null;
  url: string;
  thumbnail: string | null;
}
