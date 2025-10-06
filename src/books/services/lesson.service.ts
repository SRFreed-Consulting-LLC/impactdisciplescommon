import { BookModel } from 'impactdisciplescommon/src/books/models/book.model';
import { I18Model, TranslationsService } from 'impactdisciplescommon/src/books/services/lesson-language.service';
import { Injectable } from '@angular/core';
import { LessonModel } from '../models/lesson.model';
import { BaseService } from './base.service';
import { FirebaseDAO } from './firebase.dao';

@Injectable({
  providedIn: 'root'
})
export class LessonService extends BaseService<LessonModel>{
  constructor(public override dao: FirebaseDAO<LessonModel>, private translationsService: TranslationsService) {
    super(dao)
    this.table="lessons"
  }

  addHeaderField(form, lesson: LessonModel, book: BookModel, renderOptions: I18Model){
    if(lesson.goal){
      form['components'].unshift(
        {
          "html": "<p><strong>" + this.translationsService.translate('Goal', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> "+this.translationsService.translate(lesson.goal, renderOptions)?.replace(/<[^>]*>?/gm, '')+"</p>",
          "label": "Content",
          "refreshOnChange": false,
          "key": "content4",
          "type": "content",
          "input": false,
          "tableView": false,
        }
      )
    }

    if(lesson.memoryVerse){
      form['components'].unshift(
        {
          "html": "<p><strong>" + this.translationsService.translate('Memory Verse', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> "+this.translationsService.translate(lesson.memoryVerse, renderOptions)?.replace(/<[^>]*>?/gm, '')+"</p>",
          "label": "Content",
          "customClass": "",
          "refreshOnChange": false,
          "key": "content5",
          "type": "content",
          "input": false,
          "tableView": false
        }
      )
    }

    form['components'].unshift(
      {
          "html": "<p style=\"text-align:center;\"><span class=\"text-big\"><strong>" + this.translationsService.translate(lesson.title, renderOptions)?.replace(/<[^>]*>?/gm, '') +"</strong></span></p>",
          "label": "Content",
          "customClass": "",
          "refreshOnChange": false,
          "key": "content6",
          "type": "content",
          "input": false,
          "tableView": false
      }
    )

    form['components'].unshift(
      {
        "html": "<p style=\"text-align:center;\"><span class=\"text-big\"><strong>" + this.translationsService.translate(book.title, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</strong></span></p>",
        "label": "Content",
        "customClass": "",
        "refreshOnChange": false,
        "key": "bookTitle",
        "type": "content",
        "input": false,
        "tableView": false,

      }
    )

    return form;
  }

  addDailyReadings(form, lesson: LessonModel, renderOptions: I18Model){
    let tabs = form['components'].find(component => component['label'] == 'Tabs');

    tabs['components'].push(
        {
          "label": "Daily Readings",
          "key": "prayerRequests",
          "components": [
            {
              "html": "<p><strong>" + this.translationsService.translate('Weekly Bible Reading', renderOptions)?.replace(/<[^>]*>?/gm, '') + "</strong></p>",
              "label": "Content",
              "customClass": "",
              "refreshOnChange": false,
              "key": "content31",
              "type": "content",
              "input": false,
              "tableView": false
            },
            {
              "label": "Columns",
              "columns": [
                {
                  "components": [
                    {
                        "label": "Introduction",
                        "key": "introduction",
                        "type": "well",
                        "input": false,
                        "tableView": false,
                        "components": [
                          {
                              "html": "<p>" + this.translationsService.translate('Read the passage and write an insight on at least one of the following:', renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                              "label": "Content",
                              "customClass": "",
                              "refreshOnChange": false,
                              "key": "content32",
                              "type": "content",
                              "input": false,
                              "tableView": false
                          },
                          {
                            "html": "<p><strong>A</strong>: Attitude to Change</p>",
                            "label": "Content",
                            "customClass": "",
                            "refreshOnChange": false,
                            "key": "content33",
                            "type": "content",
                            "input": false,
                            "tableView": false
                          },
                          {
                            "html": "<p><strong>C</strong>: Command to Obey</p>",
                            "label": "Content",
                            "customClass": "",
                            "refreshOnChange": false,
                            "key": "content34",
                            "type": "content",
                            "input": false,
                            "tableView": false
                          },
                          {
                            "html": "<p><strong>T</strong>: Truth to Believe</p>",
                            "label": "Content",
                            "customClass": "",
                            "refreshOnChange": false,
                            "key": "content35",
                            "type": "content",
                            "input": false,
                            "tableView": false
                          },
                          {
                            "html": "<p><strong>S</strong>: Sin to Confess</p>",
                            "label": "Content",
                            "customClass": "",
                            "refreshOnChange": false,
                            "key": "content36",
                            "type": "content",
                            "input": false,
                            "tableView": false,
                          }
                        ]
                    }

                  ],
                  "width": 7,
                  "offset": 0,
                  "push": 0,
                  "pull": 0,
                  "size": "md",
                  "currentWidth": 6
                },
                {
                  "components": [
                    {
                      "label": "Introduction",
                      "key": "introduction",
                      "type": "well",
                      "input": false,
                      "tableView": false,
                      "components": [
                        {
                          "html": "<p><strong>" + this.translationsService.translate('Monday', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> " + this.translationsService.translate(lesson.monVerse, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                          "label": "Content",
                          "customClass": "",
                          "refreshOnChange": false,
                          "key": "monVerse",
                          "type": "content",
                          "input": false,
                          "tableView": false
                        },
                        {
                          "html": "<p><strong>" + this.translationsService.translate('Tuesday', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> " + this.translationsService.translate(lesson.tueVerse, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                          "label": "Content",
                          "customClass": "",
                          "refreshOnChange": false,
                          "key": "tueVerse",
                          "type": "content",
                          "input": false,
                          "tableView": false
                        },
                        {
                          "html": "<p><strong>" + this.translationsService.translate('Wednesday', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> " + this.translationsService.translate(lesson.wedVerse, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                          "label": "Content",
                          "customClass": "",
                          "refreshOnChange": false,
                          "key": "wedVerse",
                          "type": "content",
                          "input": false,
                          "tableView": false
                        },
                        {
                          "html": "<p><strong>" + this.translationsService.translate('Thursday', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> " + this.translationsService.translate(lesson.thuVerse, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                          "label": "Content",
                          "customClass": "",
                          "refreshOnChange": false,
                          "key": "thuVerse",
                          "type": "content",
                          "input": false,
                          "tableView": false
                        },
                        {
                          "html": "<p><strong>" + this.translationsService.translate('Friday', renderOptions)?.replace(/<[^>]*>?/gm, '') + ":</strong> " + this.translationsService.translate(lesson.friVerse, renderOptions)?.replace(/<[^>]*>?/gm, '') + "</p>",
                          "label": "Content",
                          "customClass": "",
                          "refreshOnChange": false,
                          "key": "friVerse",
                          "type": "content",
                          "input": false,
                          "tableView": false
                        }
                      ]
                    }
                  ],
                  "width": 5,
                  "offset": 0,
                  "push": 0,
                  "pull": 0,
                  "size": "md",
                  "currentWidth": 6
                }
              ],
              "customClass": "",
              "key": "columns",
              "type": "columns",
              "input": false,
              "tableView": false
            }
          ]
        }
    )
  }

  loopThroughJSON(form) {
      for (let key in form) {
        if (typeof form[key] === 'object') {
          if (Array.isArray(form[key])) {
            for (let i = 0; i < form[key].length; i++) {
              this.loopThroughJSON(form[key][i]);
            }
          } else {
            this.loopThroughJSON(form[key]);
          }
        } else {
          if(key == 'type' ){
            if(form[key] == 'textarea'){
              form['label'] = form['label']?.replace(/<[^>]*>?/gm, '')
            } else if(form[key] == 'content'){
              if(!form['html'].startsWith('<figure')){
                form['html'] = form['html']?.replace(/<[^>]*>?/gm, '')
              }

            } else if(form[key] == 'radio'){
              form['label'] = form['label']?.replace(/<[^>]*>?/gm, '')
            }

            if(form['values']){
              form['values'].forEach(value => {
                value['label'] = value['label']?.replace(/<[^>]*>?/gm, '')
              });
            }
          }
        }
      }
  }
}
