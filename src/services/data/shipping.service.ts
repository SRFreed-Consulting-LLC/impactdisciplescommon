import { Injectable } from '@angular/core';
import { FirebaseDAO } from 'impactdisciplescommon/src/dao/firebase.dao';
import { UNIT_OF_MEASURE } from 'impactdisciplescommon/src/lists/unit_of_measure.enum';
import { ShippingModel, Package, WeightDetail, ShippingRequest, RateOptions } from 'impactdisciplescommon/src/models/domain/shipment.model';
import { Address } from 'impactdisciplescommon/src/models/domain/utils/address.model';
import { Phone } from 'impactdisciplescommon/src/models/domain/utils/phone.model';
import { CheckoutForm } from 'impactdisciplescommon/src/models/utils/cart.model';
import { WebConfigModel } from 'impactdisciplescommon/src/models/utils/web-config.model';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { WebConfigService } from './web-config.service';


@Injectable({
  providedIn: 'root'
})
export class ShippingService extends BaseService<ShippingModel>{
  constructor(public override dao: FirebaseDAO<ShippingModel>, private webConfigService: WebConfigService) {
    super(dao)
    this.table="shipments"
  }

  async calculateShipping(checkoutForm: CheckoutForm): Promise<CheckoutForm>{
    let totalWeight: number;

    try{
      totalWeight = checkoutForm.cartItems.filter(item => item.isEvent == false).map(item => item.weight? item.weight : 0).reduce((a,b) => a + b);
    }
    catch(err){
      totalWeight = 0;
    }

    let request: ShippingRequest = await this.createRequest(checkoutForm, totalWeight);

    if(totalWeight > 0){
      return this.makeRequest(request).then(result => {
        if (result) {
          result.rateResponse.rates.sort((a, b) => a.shippingAmount.amount - b.shippingAmount.amount);

          checkoutForm.shippingRateId = {... result.rateResponse.rates[0]};

          checkoutForm.shippingRate = Number(Number(result.rateResponse.rates[0].shippingAmount.amount).toFixed(2));

          checkoutForm.total += checkoutForm.shippingRate > 0 ? checkoutForm.shippingRate : 0;
        }

        return checkoutForm;
      })
    } else {
      checkoutForm.shippingRate = 0;

      return Promise.resolve(checkoutForm)
    }
  }

  private async createRequest(checkoutForm: CheckoutForm, weight: number): Promise<ShippingRequest>{
    const configs = await this.webConfigService.getAll();

    let toName: string = checkoutForm.firstName + ' ' + checkoutForm.lastName;
    let toAddress: Address = checkoutForm.shippingAddress;
    let toPhone: Phone = checkoutForm.phone;

    let shipping: ShippingModel = {...new ShippingModel()};
    shipping.shipTo.name = toName;
    shipping.shipTo.phone = toPhone.number;
    shipping.shipTo.addressLine1 = toAddress.address1;
    shipping.shipTo.cityLocality = toAddress.city;
    shipping.shipTo.stateProvince = toAddress.state;
    shipping.shipTo.postalCode = toAddress.zip;
    shipping.shipTo.countryCode = toAddress.country;

    shipping.shipFrom.name = "Impact Disciples";
    shipping.shipFrom.phone = configs[0].phone;
    shipping.shipFrom.addressLine1 = configs[0].address.address1;
    shipping.shipFrom.cityLocality = configs[0].address.city;
    shipping.shipFrom.stateProvince = configs[0].address.state;
    shipping.shipFrom.postalCode = configs[0].address.zip;
    shipping.shipFrom.countryCode = "US";

    let pkg: Package = {... new Package()};
    pkg.weight = {...new WeightDetail()};
    pkg.weight.unit = UNIT_OF_MEASURE.OUNCE;
    pkg.weight.value = weight? weight : 0;

    shipping.packages.push(pkg);

    let request: ShippingRequest = {... new ShippingRequest()};
    request.rateOptions = {... new RateOptions()};
    request.rateOptions.carrierIds.push("se-914430");
    request.shipment = shipping;

    return request;
  }

  private async makeRequest(request: ShippingRequest){
    const response = await fetch(environment.shippingUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Failed to get Shipping Rates: ' + JSON.stringify(response));
    }

    const rate = await response.json();

    return rate;
  }
}
