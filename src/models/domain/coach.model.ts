import { OrganizationModel } from "./organization.model";
import { Person } from "./utils/person.model";

export class CoachModel extends Person {
  fullname: string;
  title: string;
  photoUrl: any;
  bio: string
  organization: OrganizationModel | any;

  constructor(){
    super();

    this.fullname = this.firstName + ' ' + this.lastName;
  }
}
