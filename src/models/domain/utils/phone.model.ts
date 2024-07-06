import { PHONE_TYPES } from "impactdisciplescommon/src/lists/phone_types.enum";

export class Phone {
    countryCode: string;
    number: string;
    extension: string;
    type: PHONE_TYPES;

    constructor(countryCode: string, number: string, type: PHONE_TYPES){
        this.countryCode = countryCode;
        this.number = number;
        this.type = type;
    }
}
