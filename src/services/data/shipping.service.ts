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


@Injectable({
  providedIn: 'root'
})
export class ShippingService extends BaseService<ShippingModel>{
  constructor(public override dao: FirebaseDAO<ShippingModel>) {
    super(dao)
    this.table="shipments"
  }

  async calculateShipping(config: WebConfigModel, checkoutForm: CheckoutForm, weight:number){
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
    shipping.shipFrom.phone = config.phone;
    shipping.shipFrom.addressLine1 = config.address.address1;
    shipping.shipFrom.cityLocality = config.address.city;
    shipping.shipFrom.stateProvince = config.address.state;
    shipping.shipFrom.postalCode = config.address.zip;
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
