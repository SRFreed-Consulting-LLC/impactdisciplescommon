import { Address } from "./utils/address.model";
import { OrganizationModel } from "./organization.model";
import { Person } from "./utils/person.model";
import { Phone } from "./utils/phone.model";

export class CoachModel extends Person {
  fullname: string;
  title: string;
  photoUrl: string;
  bio: string
  organization: OrganizationModel;

  constructor(firstName: string, lastName: string, address: Address, phone: Phone, title: string, photoUrl: string, bio: string, organization: OrganizationModel){
    super(firstName, lastName, address, phone);

    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phone = phone;
    this.title = title;
    this.photoUrl = photoUrl;
    this.bio = bio;
    this.organization = organization;

    this.fullname = this.firstName + ' ' + this.lastName;
  }
}
