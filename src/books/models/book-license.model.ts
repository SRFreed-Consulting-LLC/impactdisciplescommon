import { BaseModel } from "./base.model";

export class BookLicenseModel extends BaseModel {
  purchaseDate: any;
  bookTitle: string;
  bookId: string;
  type: string;
  length: number;
}
