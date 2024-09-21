import { BaseModel } from "../base.model"

export class ProductModel extends BaseModel {
  imageUrl:string;
  title: boolean;
  cost: number | null;
  description: string;
  series: string;
  tags: string[];
  category?: string;
}
