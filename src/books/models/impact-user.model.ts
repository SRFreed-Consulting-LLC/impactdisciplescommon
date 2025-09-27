import { Person } from "../../models/domain/utils/person.model";

export class ImpactUser extends Person {
    email: string;
    firebaseUID: string;

    constructor(){
      super();
    }


}
