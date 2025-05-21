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
  salePrice?: number;
  orderQuantity?: number;
  discount?: number;
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
  size?: string;
  color?: string;
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
  receipt?: string;
  isNewsletter?: boolean;
  isCreateAccount?: boolean;
  paymentIntent?: PaymentIntent | string;
  dateProcessed?: Timestamp;
  processedStatus?: string;

  //total sale amount
  total?: number = 0;
  //total discount on items
  discount?: number = 0;
  //cart total
  totalBeforeDiscount?: number;
  //code for coupon
  couponCode?: string;
  //coupon discount percentage
  couponPercent?: number;
  //amount charged for shipping
  shippingRate?: number = 0;
  //id of shipping rate used
  shippingRateId?: any;
  //amount of shipping discount
  shippingDiscount?: number = 0;
  //shipping discount reason
  shippingDiscountReason?: string;
  //amount charged for taxes
  estimatedTaxes?: number = 0;
  //percent used to figure taxes
  taxRate?: number = 0;
  //service rate or default rate
  taxSource?: string;

  shippingLabel?: any;
  refundAmount?: number = 0;
  refundId?: string;
}
