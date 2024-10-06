import { Injectable } from '@angular/core';
import { TaxRate } from 'impactdisciplescommon/src/models/utils/tax-rate.model';

@Injectable({
  providedIn: 'root'
})
export class FileImportService {
    constructor() {}

    ngOnInit(): void {}

    importRatesFiles(files: File[]): Promise<TaxRate[]>{
      let promises: Promise<TaxRate[]>[] = []

      for(const file of files){
        promises.push(this.convertFileToPaidArray(file).then(t => Promise.resolve(t)))
      }

      return Promise.all(promises).then(rates => {
        return rates.reduce((accumulator, value) => accumulator.concat(value), []);
      })
    }

    convertFileToPaidArray(file: File): Promise<TaxRate[]>{
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
          let text = reader.result;
          let rates = this.createRatesArray(text);
          resolve(rates);
        };
      });
    }

    createRatesArray(csvText): TaxRate[]{
      let lines: string[] = csvText.split("\n");
      let headers: string[] = lines[0].split(",");

      let rates: TaxRate[] = [];

      for (var i = 1; i < lines.length-1; i++) {
        try{
          var obj = {... new TaxRate()};
          let currentline: string[] = lines[i].split(",");

          for (var j = 0; j < headers.length; j++) {
              obj[this.lowercaseFirstLetter(headers[j])] = currentline[j].trim();
          }

          rates.push(obj);
        } catch (err){
          console.error(err)
        }
      }

      return rates;
    }

    lowercaseFirstLetter(str) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
  }


