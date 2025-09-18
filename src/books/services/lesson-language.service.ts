import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { FirebaseDAO, QueryParam, WhereFilterOperandKeys } from './firebase.dao';
import { LessonLanguageModel } from '../models/lesson-language.model';
import { RouteItem } from 'impactdisciplescommon/src/models/utils/route-item';
import { Actions, ofActionDispatched } from '@ngxs/store';
import { LanguageChangedAction } from '../actions/language-changed.actions';

@Injectable({
  providedIn: 'root'
})
export class LessonLanguageService extends BaseService<LessonLanguageModel> {
  constructor(public override dao: FirebaseDAO<LessonLanguageModel>, private actions$: Actions,) {
    super(dao)
    this.table="lessons-languages"

    this.actions$.pipe(ofActionDispatched(LanguageChangedAction)).subscribe(() => {
      this.initMenu()
    })

    this.initMenu()
  }

  async getLanguageModel(language: string, bookId: string, lessonId: string){
    let app = await this.getApplicationLanguageModel(language);
    let book = await this.getBookLessonModel(language, bookId);
    let lesson = await this.getLessonLanguageModel(language, lessonId)

    return this.createFormOptions(language, app, book, lesson)
  }

  private createFormOptions(language: string, application: LessonLanguageModel, book: LessonLanguageModel, lesson: LessonLanguageModel){
    let formOptions = {
      language: language,
      i18n:{}
    }

    if(!formOptions.i18n[language]){
      formOptions.i18n[language] = {}
    }

    let kvmodels = [application, book, lesson]

    kvmodels.forEach(model => {
      if(model && model.kvPairs){
        let pairs = model.kvPairs.sort((a,b) => a.key - b.key);

        pairs.forEach(kvPair => {
          formOptions.i18n[language][kvPair['content']] = kvPair['translation'] ? kvPair['translation'] : kvPair['content']
        })
      }
    })

    return formOptions;
  }

  private async getApplicationLanguageModel(language: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('type', WhereFilterOperandKeys.equal, 'application'))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp).then(lls => {
      if(lls && lls.length == 1){
        return lls[0]
      } else {return null}
    })
  }

  private async getBookLessonModel(language: string, book: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('book', WhereFilterOperandKeys.equal, book))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp).then(lls => {
      if(lls && lls.length == 1){
        return lls[0]
      } else {return null}
    })
  }

  private async getLessonLanguageModel(language: string, lesson: string){
    let qp: QueryParam[] = []
    qp.push(new QueryParam('lesson', WhereFilterOperandKeys.equal, lesson))
    qp.push(new QueryParam('language', WhereFilterOperandKeys.equal, language))

    return await this.queryAllByMultiValue(qp).then(lls => {
      if(lls && lls.length == 1){
        return lls[0]
      } else {return null}
    })
  }

  public menuItems: string[] = [];

  public tabsWithIcon: RouteItem[]=[];

  async initMenu(){
    if(!localStorage.getItem('impactdiscipleship.book.language.i18n')){
      let language = localStorage.getItem('impactdiscipleship.book.language')

      localStorage.setItem('impactdiscipleship.book.language.i18n', JSON.stringify(await this.getLanguageModel(language ? language: 'en', '', '')))
    }

    this.tabsWithIcon = [
      { id: 0, name:'Home', route:'home', icon: 'fa-solid fa-book', text: this.translate('Library'), level: 0},
      { id: 1, name:'Schedule', route:'lessons', icon: 'event', text: 'T.O.C.', level: 0},
      { id: 2, name:'Map', route:'map', icon: 'group', text: this.translate('Groups'), level: 0},
      { id: 2, name:'User', route:'user-profile', icon: 'user', text: this.translate('Profile'), level: 0}
    ];

    this.menuItems = [this.translate('Log Off'), this.translate('Languages')]
  }

  translate(word){
    let renderOptions = JSON.parse(localStorage.getItem('impactdiscipleship.book.language.i18n'))
    return renderOptions['i18n'][renderOptions['language']][word]
  }
}
