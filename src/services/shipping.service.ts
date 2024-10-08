import { Package, RateOptions, ShippingRequest, WeightDetail } from './../models/domain/shipment.model';
import { Injectable } from '@angular/core';
import { FirebaseDAO } from '../dao/firebase.dao';
import { Observable } from 'rxjs';
import { ShippingModel } from '../models/domain/shipment.model';
import { Address } from '../models/domain/utils/address.model';
import { UNIT_OF_MEASURE } from '../lists/unit_of_measure.enum';
import { environment } from 'src/environments/environment';
import { Phone } from '../models/domain/utils/phone.model';
import { WebConfigModel } from '../models/utils/web-config.model';
import { CheckoutForm } from '../models/utils/cart.model';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
  table: string = 'shipments';

  constructor(public dao: FirebaseDAO<ShippingModel>) {}

  getAll(): Promise<ShippingModel[]>{
    return this.dao.getAll(this.table);
  }

  streamAll(): Observable<ShippingModel[]>{
    return this.dao.streamAll(this.table);
  }

  getAllByValue(field: string, value: any): Promise<ShippingModel[]>{
    return this.dao.getAllByValue(this.table, field, value);
  }

  getById(id: String): Promise<ShippingModel>{
    return this.dao.getById(id, this.table);
  }

  add(value: ShippingModel): Promise<ShippingModel>{
    return this.dao.add(value, this.table);
  }

  update(id: string, value: ShippingModel): Promise<ShippingModel>{
    return this.dao.update(id, value, this.table);
  }

  delete(id: string){
    return this.dao.delete(id, this.table);
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

    console.log(rate);

    return rate;
  }
}
