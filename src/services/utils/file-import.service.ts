import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileImportService<T> {
    constructor() {}

    ngOnInit(): void {}

    importFiles(files: File[]): Promise<T[]>{
      let promises: Promise<T[]>[] = []

      for(const file of files){
        promises.push(this.convertFileToArray(file).then(t => Promise.resolve(t)))
      }

      return Promise.all(promises).then(rates => {
        return rates.reduce((accumulator, value) => accumulator.concat(value), []);
      })
    }

    private convertFileToArray(file: File): Promise<T[]>{
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          let text = reader.result;
          let rates = this.createObjectArray(text);
          resolve(rates);
        };
      });
    }

    private createObjectArray(csvText): T[]{
      let lines: string[] = csvText.split("\n");
      let headers: string[] = lines[0].split(",");

      let items: T[] = [];

      for (var i = 1; i < lines.length-1; i++) {
        try{
          var obj = {... {} as T};
          let currentline: string[] = lines[i].split(",");

          for (var j = 0; j < headers.length; j++) {
              obj[this.lowercaseFirstLetter(headers[j].trim())] = currentline[j].trim();
          }

          items.push(obj);
        } catch (err){
          console.error(err)
        }
      }

      return items;
    }

    private lowercaseFirstLetter(str: string) {
      return str.charAt(0).toLowerCase().trim() + str.slice(1);
    }
  }


