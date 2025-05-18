import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model"

export class SaleModel extends BaseModel {
  name: string;
  startDate: Timestamp;
  endDate: Timestamp;
  isActive: boolean = false;
  percentOff: number | null;
  isEvents: boolean = false;
  isProducts: boolean = false;
  isShipping: boolean = false;
}

