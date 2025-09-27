import { Timestamp } from "firebase/firestore";
import { BaseModel } from "./base.model";

export class BookLicenseModel extends BaseModel {
  purchaseDate: Timestamp;
  bookTitle: string;
  bookId: string;
  type: string;
  length: number;

}
