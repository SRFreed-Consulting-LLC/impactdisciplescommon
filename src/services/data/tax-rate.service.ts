import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { TaxRate } from 'impactdisciplescommon/src/models/utils/tax-rate.model';
import { BaseService } from './base.service';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';


@Injectable({
  providedIn: 'root'
})
export class TaxRateService extends BaseService<TaxRate>{
  constructor(public override dao: FirebaseDAO<TaxRate>) {
    super(dao)
    this.table="tax_rates"
  }

  async calculateTaxRate(checkoutForm: CheckoutForm): Promise<CheckoutForm>{
    const taxRates = await this.getAllByValue("zipCode", checkoutForm.shippingAddress.zip);

    if (!taxRates || taxRates.length == 0) {
      console.log("No qualified tax rate found for zip code " + checkoutForm.shippingAddress.zip);
    } else if (taxRates.length > 1) {
      console.log("found more than 1 qualified tax rate");
    } else {
      checkoutForm.taxRate = taxRates[0].estimatedCombinedRate;

      let taxableAmount : number;

      try{
        taxableAmount = checkoutForm.cartItems.filter(item => item.isEvent == false).map(item => item.price? item.price : 0)?.reduce((a,b) => a + b);
      } catch(err){
        taxableAmount = 0;
      }

      checkoutForm.estimatedTaxes = Number((taxableAmount * taxRates[0].estimatedCombinedRate).toFixed(2));

      checkoutForm.total += Number(checkoutForm.estimatedTaxes.toFixed(2));
    }

    return checkoutForm;
  }
}


