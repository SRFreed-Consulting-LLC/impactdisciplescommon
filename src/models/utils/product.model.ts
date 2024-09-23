import { BaseModel } from "../base.model"
import { TagModel } from "../domain/tag.model";

export class ProductModel extends BaseModel {
  imageUrl: any;
  title: string;
  cost: number | null;
  description: string;
  series: string;
  tags: TagModel[];
  category?: string;
}
