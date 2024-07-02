import { Role } from "../../lists/roles.enum";
import { Address } from "../domain/utils/address.model";
import { Organization } from "../domain/utils/organization.model";
import { Person } from "../domain/utils/person.model";
import { Phone } from "../domain/utils/phone.model";


export class AppUser extends Person {
    email: string;
    firebaseUID: string;
    company: Organization;
    role: Role;

    constructor(firstName: string, lastName: string, address: Address, phone: Phone, company: Organization, email: string, firebaseUID: string, role: Role){
        super(firstName, lastName, address, phone);
        this.email = email;
        this.firebaseUID = firebaseUID;
        this.company = company;
        this.role = role;
    }
}
