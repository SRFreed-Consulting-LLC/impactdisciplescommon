import { Injectable } from '@angular/core';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaxRateService{
  async calculateTaxRate(checkoutForm: CheckoutForm): Promise<CheckoutForm>{
    var myHeaders = new Headers();
    myHeaders.append("apikey", environment.taxApiKey);

    const taxRates = await fetch("https://api.apilayer.com/tax_data/tax_rates?zip="+checkoutForm.shippingAddress.zip+"&use_client_ip=false&country=US", {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    })
      .then(response => response.json())
      .catch(error => console.log('error', error));

    if (!taxRates) {
      console.log("No qualified tax rate found for zip code " + checkoutForm.shippingAddress.zip);
      checkoutForm.taxRate = .07;
    } else {
      //if no response received. defaultto .07
      checkoutForm.taxRate = taxRates?.combined_rate ? taxRates.combined_rate : .07;
    }

    let taxableAmount : number;

    try{
      taxableAmount = checkoutForm.cartItems.filter(item => item.isEvent == false).map(item => (item.price? item.price : 0) * item.orderQuantity)?.reduce((a,b) => a + b);
    } catch(err){
      taxableAmount = 0;
    }

    checkoutForm.estimatedTaxes = Number((taxableAmount * checkoutForm.taxRate).toFixed(2));

    checkoutForm.total += Number(checkoutForm.estimatedTaxes.toFixed(2));

    return checkoutForm;
  }
}


