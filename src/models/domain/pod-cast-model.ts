import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class PodCastModel extends BaseModel{
  title: string;
  date: Timestamp | Date | null;
  videoType: string;
  videoId: string;
  thumbnail: any | null;
  tags: string[];
}
