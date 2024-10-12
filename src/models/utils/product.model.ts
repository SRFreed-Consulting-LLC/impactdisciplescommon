import { UNIT_OF_MEASURE } from "impactdisciplescommon/src/lists/unit_of_measure.enum";
import { BaseModel } from "../base.model"
import { TagModel } from "../domain/tag.model";

export class ProductModel extends BaseModel {
  isActive: boolean = false;
  imageUrl: any;
  title: string;
  cost: number = 0;
  description: string;
  series: string;
  tags?: TagModel[];
  category?: string;
  weight?: number;
  uom?: UNIT_OF_MEASURE;
  isEBook: boolean = false;
  eBookUrl: any;
}
