import { UNIT_OF_MEASURE } from 'impactdisciplescommon/src/lists/unit_of_measure.enum';
import { BaseModel } from '../base.model';

export class ShippingModel extends BaseModel {
  shipTo: ShippingToAddress = {... new ShippingToAddress()};
  shipFrom: ShippingFromAddress = {... new ShippingFromAddress()};
  packages: Package[] = [];;
}

export class ShippingToAddress {
  name: string;
  addressLine1: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
}

export class ShippingFromAddress {
  companyName: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
}
export class Package {
  weight: WeightDetail;
}

export class WeightDetail{
  value: number;
  unit: UNIT_OF_MEASURE
}



