import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class BlogPostModel extends BaseModel {
  title: string;
  date: Timestamp;
  subject: string | null;
  blogText: string;
  mainImage: string;
  extraImages: string [];
}
