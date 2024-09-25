import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";
import { TagModel } from "./tag.model";

export class BlogPostModel extends BaseModel {
  isActive: boolean = false;
  title: string;
  date: Timestamp;
  category?: string;
  blogText: string;
  mainImage: any;
  extraImages: string [];
  tags?: TagModel[];
}
