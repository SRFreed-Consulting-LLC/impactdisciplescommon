import { PHONE_TYPES } from "../lists/phone_types.enum";
import { Role } from "../lists/roles.enum";
import { States } from "../lists/states.enum";
import { TESTIMONIAL_TYPES } from "../lists/testimonial_types.enum";

export class EnumHelper {
  static getPhoneTypesAsArray(): PHONE_TYPES[] {
    return Object.keys(PHONE_TYPES).map(key => PHONE_TYPES[key]);
  }

  static getTestimonialTypesAsArray(): TESTIMONIAL_TYPES[] {
    return Object.keys(TESTIMONIAL_TYPES).map(key => TESTIMONIAL_TYPES[key]);
  }

  static getRoleTypesAsArray(): Role[] {
    return Object.keys(Role).map(key => Role[key]);
  }

  static getStateRoleTypesAsArray(): string[] {
    return Object.values(States) as [];
  }

}
