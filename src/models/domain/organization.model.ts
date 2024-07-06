import { BaseModel } from "../base.model";
import { Address } from "./utils/address.model";
import { Person } from "./utils/person.model";
import { Phone } from "./utils/phone.model";

export class OrganizationModel extends BaseModel {
    name: string;
    contactName: string;
    address: Address;
    phone: Phone;

    constructor(name: string, contactName: string, address: Address, phone: Phone){
        super();
        this.name = name;
        this.contactName = contactName;
        this.address = address;
        this.phone = phone;
    }
}
