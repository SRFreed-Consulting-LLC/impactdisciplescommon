import { Role } from "impactdisciplescommon/src/lists/roles.enum";
import { Person } from "./person.model";

export class CustomerModel extends Person {
    email: string;
    firebaseUID: string;
    role: Role = Role.CUSTOMER;

    constructor(){
      super();
    }


}
