import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO, QueryParam, WhereFilterOperandKeys } from './firebase.dao';
import { LessonLanguageModel } from '../models/lesson-language.model';

@Injectable({
  providedIn: 'root'
})
export class LessonLanguageService extends BaseService<LessonLanguageModel> {
  constructor(public override dao: FirebaseDAO<LessonLanguageModel>) {
    super(dao)

    this.table="lessons-languages"
  }

  async getLessonLanguageModel(language: string, lessonId: string){
    let app = await this.getApplicationTranslations(language);
    let books = await this.getBooksTranslations(language);
    let lesson = await this.getLessonTranslations(language, lessonId)

    return this.createFormOptions(language, [app, ...books, lesson])
  }

  async getAppLanguageModel(language: string){
    let app = await this.getApplicationTranslations(language);

    return this.createFormOptions(language, [app])
  }

  async getBookLanguageModel(language: string){
    let books = await this.getBooksTranslations(language);

    return this.createFormOptions(language, books)
  }

  private createFormOptions(language: string, models: LessonLanguageModel[]){
    let formOptions = {
      language: language,
      i18n:{}
    }

    if(!formOptions.i18n[language]){
      formOptions.i18n[language] = {}
    }

    models.forEach(model => {
      if(model && model.kvPairs){
        let pairs = model.kvPairs.sort((a,b) => a.key - b.key);

        pairs.forEach(kvPair => {
          formOptions.i18n[language][kvPair['content'].replace(/<[^>]*>?/gm, '')] = kvPair['translation'] ? kvPair['translation'] : kvPair['content']
        })
      }
    })

    return formOptions;
  }

  private async getApplicationTranslations(language: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('type', WhereFilterOperandKeys.equal, 'application'))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp).then(lls => {
      if(lls && lls.length == 1){
        return lls[0]
      } else {return null}
    })
  }

  private async getBooksTranslations(language: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('type', WhereFilterOperandKeys.equal, 'book'))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp)
  }

  private async getLessonTranslations(language: string, lesson: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('type', WhereFilterOperandKeys.equal, 'lesson'))
    qp.push(new QueryParam('lesson', WhereFilterOperandKeys.equal, lesson))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp).then(lls => {
      if(lls && lls.length == 1){
        return lls[0]
      } else {return null}
    })
  }

  translate(word, renderOptions){
    return renderOptions['i18n'][renderOptions['language']][word]
  }
}
