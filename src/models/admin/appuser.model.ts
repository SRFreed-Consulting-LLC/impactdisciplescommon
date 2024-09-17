import { Role } from "../../lists/roles.enum";
import { Address } from "../domain/utils/address.model";
import { OrganizationModel } from "../domain/organization.model";
import { Person } from "../domain/utils/person.model";
import { Phone } from "../domain/utils/phone.model";


export class AppUser extends Person {
    email: string;
    firebaseUID: string;
    company: OrganizationModel;
    role: Role;

    constructor(){
      super();
    }


}
