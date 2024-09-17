import { BaseModel } from "../../base.model";
import { Address } from "../utils/address.model";
import { Phone } from "../utils/phone.model";

export class Person extends BaseModel {
    firstName: string;
    lastName: string;

    address: Address;
    phone: Phone;

    constructor(){
      super();
    }
}
