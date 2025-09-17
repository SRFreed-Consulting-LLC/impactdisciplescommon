import { BaseModel } from "./base.model";

export class LessonLanguageModel extends BaseModel {
    type: string;
    lesson?: string;
    book?: string;
    language: string;
    kvPairs: any[] = [];
}

