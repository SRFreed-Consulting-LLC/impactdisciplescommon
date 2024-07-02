import { BaseModel } from "../../base.model";
import { Address } from "../utils/address.model";
import { Phone } from "../utils/phone.model";

export class Person extends BaseModel{
    firstName: string;
    lastName: string;

    address: Address;
    phone: Phone;

    constructor(firstName: string, lastName: string, address: Address, phone: Phone){
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
    }
}
