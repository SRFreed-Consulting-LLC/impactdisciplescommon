import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";
import { TagModel } from "./tag.model";

export class BlogPostModel extends BaseModel {
  title: string;
  date: Timestamp;
  subject: string | null;
  blogText: string;
  mainImage: any;
  extraImages: string [];
  tags: string[];
}
