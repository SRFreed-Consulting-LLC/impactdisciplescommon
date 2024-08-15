import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private stripe: Promise<Stripe>;

  constructor() {
    this.stripe = loadStripe(environment.stripeTestKey);
  }

  async getStripe(): Promise<Stripe>{
    if(this.stripe){
      return this.stripe;
    } else {
      return loadStripe(environment.stripeTestKey);
    }
  }
}
