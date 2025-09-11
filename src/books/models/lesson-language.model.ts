import { BaseModel } from "./base.model";

export class LessonLanguageModel extends BaseModel {
    lesson: string;
    language: string;
    kvPairs: any[] = [];
}

