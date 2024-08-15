import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSourceHelperService {
  public isLoading = false;

  public loadPanelPosition = { of: '#grid' };

  constructor() { }

  public onRowSaved(e, service: any){
    this.isLoading = true;

    if(e.changes[0].type != 'remove'){
      service.update(e.changes[0].key, e.changes[0].data);
      e.cancel = true;
      this.isLoading = false;
    }
  }

  public  onRowAdded(e, service: any){
    this.isLoading = true;

    service.add(e.data);
    e.cancel = true;
    this.isLoading = false;
  }

  public onRowRemoved(e, service: any){
    this.isLoading = true;

    service.delete(e.key);
    e.cancel = true;
    this.isLoading = false;
  }
}
