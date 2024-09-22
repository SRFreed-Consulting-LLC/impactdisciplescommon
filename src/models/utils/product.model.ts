import { BaseModel } from "../base.model"

export class ProductModel extends BaseModel {
  imageUrl: any;
  title: string;
  cost: number | null;
  description: string;
  series: string;
  tags: string[];
  category?: string;
}
