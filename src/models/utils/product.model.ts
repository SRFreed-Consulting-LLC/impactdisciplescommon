import { BaseModel } from "../base.model"
import { TagModel } from "../domain/tag.model";

export class ProductModel extends BaseModel {
  imageUrl:string;
  title: boolean;
  cost: number | null;
  description: string;
  series: string;
  tags: TagModel[];
  category?: TagModel;
}
