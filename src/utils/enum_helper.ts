import { PHONE_TYPES } from "../lists/phone_types.enum";

export class EnumHelper {
  static getPhoneTypesAsArray(): PHONE_TYPES[] {
    return Object.keys(PHONE_TYPES).map(key => PHONE_TYPES[key]);
  }
}
