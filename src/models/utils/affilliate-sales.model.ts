import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model"

export class AffilliateSalesModel extends BaseModel {
  date: Timestamp;
  code: string;
  email: string;
  receipt: string;
  totalBeforeDiscount: number | null;
  totalAfterDiscount: number | null;
}
