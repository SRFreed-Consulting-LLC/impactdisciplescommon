import { Timestamp } from "firebase/firestore";
import { BaseModel } from "../base.model";

export class ConfigModel extends BaseModel{
  policy: string;
  tos: string
  countdownEndDateTime: Timestamp | null;
  images: string [ ] | null;
  email: string;
  phone: string;
  address: string;
  logo: string;
  twitter: string | null;
  facebook: string | null;
  linkedIn: string | null;
  youtube: string | null;
  instagram: string | null ;
}
