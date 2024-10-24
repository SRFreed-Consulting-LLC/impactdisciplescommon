import { Timestamp } from 'firebase/firestore';
import { PaymentIntent } from "@stripe/stripe-js";
import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { Address } from "impactdisciplescommon/src/models/domain/utils/address.model";
import { Phone } from "impactdisciplescommon/src/models/domain/utils/phone.model";
import { UNIT_OF_MEASURE } from 'impactdisciplescommon/src/lists/unit_of_measure.enum';

export interface CartItem {
  id?: string;
  itemName?: string;
  price?: number;
  orderQuantity?: number;
  discountPrice?: number;
  isEvent?: boolean;
  isEBook?: boolean;
  img?: any;
  attendees?: Attendee[];
  dateProcessed?: Timestamp;
  processedStatus?: string;
  weight?: number;
  uom?: UNIT_OF_MEASURE;
  eBookUrl?: any;
}

export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  receipt?: string;
}

export class CheckoutForm extends BaseModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: Phone;
  isShippingSameAsBilling?: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
  cartItems?: CartItem[];
  total?: number = 0;
  totalBeforeDiscount?: number;
  totalBeforeDiscountWithShipping?: number;
  receipt?: string;
  isNewsletter?: boolean;
  isCreateAccount?: boolean;
  couponCode?: string;
  paymentIntent?: PaymentIntent | string;
  dateProcessed?: Timestamp;
  processedStatus?: string;
  shippingRate?: number = 0;
  shippingRateId?: any;
  shippingLabel?: any;
  estimatedTaxes?: number = 0;
  taxRate?: number = 0;
  refundAmount?: number = 0;
  refundId?: string;
  processed?: boolean = false;
}
