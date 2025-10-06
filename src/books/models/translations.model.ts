import { BaseModel } from "./base.model";

export class TranslationsModel extends BaseModel {
    type: string;
    lesson?: string;
    book?: string;
    language: string;
    kvPairs: any[] = [];
}

