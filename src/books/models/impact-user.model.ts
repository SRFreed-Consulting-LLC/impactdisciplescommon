import { Person } from "../../models/domain/utils/person.model";
import { BookLicenseModel } from "./book-license.model";

export class ImpactUser extends Person {
    email: string;
    firebaseUID: string;
    bookLicenses: BookLicenseModel[] = [];

    constructor(){
      super();
    }


}
