import { PHONE_TYPES } from "../lists/phone_types.enum";
import { TESTIMONIAL_TYPES } from "../lists/testimonial_types.enum";

export class EnumHelper {
  static getPhoneTypesAsArray(): PHONE_TYPES[] {
    return Object.keys(PHONE_TYPES).map(key => PHONE_TYPES[key]);
  }

  static getTestimonialTypesAsArray(): TESTIMONIAL_TYPES[] {
    return Object.keys(TESTIMONIAL_TYPES).map(key => TESTIMONIAL_TYPES[key]);
  }



}
