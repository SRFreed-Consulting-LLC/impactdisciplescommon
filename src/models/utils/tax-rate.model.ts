import { States } from "impactdisciplescommon/src/lists/states.enum";
import { BaseModel } from "../base.model";

export class TaxRate extends BaseModel{
  state: States;
  zipCode: string;
  taxRegionName: string;
  estimatedCombinedRate: number;
  stateRate: number;
  estimatedCountyRate: number;
  estimatedCityRate: number;
  estimatedSpecialRate: number
  riskLevel: string;
}
