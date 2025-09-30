import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternetCheckerService {

  isConnected: boolean = navigator.onLine;

  @HostListener('window:online', ['$event'])
  onOnline(event: Event): void {
    this.isConnected = true;
    console.log('User is now online');
  }

  @HostListener('window:offline', ['$event'])
  onOffline(event: Event): void {
    this.isConnected = false;
    console.log('User is now offline');
  }
}
