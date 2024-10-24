import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";
import { TagModel } from "./tag.model";
import { ImageModel } from "../utils/image.model";

export class BlogPostModel extends BaseModel {
  isActive: boolean = false;
  title: string;
  date: Timestamp;
  category?: string;
  blogText: string;
  mainImage: ImageModel;
  extraImages: ImageModel [] = [];
  tags?: TagModel[];
}
