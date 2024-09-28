import { Timestamp } from 'firebase/firestore';
import { PaymentIntent } from "@stripe/stripe-js";
import { BaseModel } from "impactdisciplescommon/src/models/base.model";
import { Address } from "impactdisciplescommon/src/models/domain/utils/address.model";
import { Phone } from "impactdisciplescommon/src/models/domain/utils/phone.model";

export interface CartItem {
  id?: string;
  itemName?: string;
  price?: number;
  orderQuantity?: number;
  discountPrice?: number;
  isEvent?: boolean;
  img?: any;
  attendees?: Attendee[];
  dateProcessed?: Timestamp;
  processedStatus?: string;
}

export interface Attendee {
  firstName: string;
  lastName: string;
  email: string;
  receipt?: string;
}

export interface CheckoutForm extends BaseModel {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: Phone;
  isShippingSameAsBilling?: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
  cartItems?: CartItem[];
  total?: number;
  totalBeforeDiscount?: number;
  receipt?: string;
  isNewsletter?: boolean;
  isCreateAccount?: boolean;
  couponCode?: string;
  paymentIntent?: PaymentIntent | string;
  dateProcessed?: Timestamp;
  processedStatus?: string;
}
