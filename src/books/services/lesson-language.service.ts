import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO, QueryParam, WhereFilterOperandKeys } from './firebase.dao';
import { TranslationsModel } from '../models/translations.model';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService extends BaseService<TranslationsModel> {
  constructor(public override dao: FirebaseDAO<TranslationsModel>) {
    super(dao)

    this.table="lessons-languages"
  }

  async getLessonTranslationModel(language: string, lessonId: string){
    let app = await this.getApplicationTranslations(language);
    let books = await this.getBooksTranslations(language);
    let lesson = await this.getLessonTranslations(language, lessonId)

    return this.createFormOptions(language, [app, ...books, lesson])
  }

  async getAppTranslationModel(language: string){
    let app = await this.getApplicationTranslations(language);

    return this.createFormOptions(language, [app])
  }

  async getBookTranslationModel(language: string){
    let books = await this.getBooksTranslations(language);

    return this.createFormOptions(language, books)
  }

  private createFormOptions(language: string, models: TranslationsModel[]): I18Model{
    let formOptions = {...new I18Model()}

    if(!formOptions.i18n[language]){
      formOptions.language = language;
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

  translate(word, renderOptions: I18Model){
    return renderOptions.i18n[renderOptions.language][word]
  }
}

export class I18Model{
  language: string;
  i18n: {} = {}
}
