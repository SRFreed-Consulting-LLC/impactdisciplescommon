import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'impactdisciplescommon/src/services/data/logger.service';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-capture-username-form',
  templateUrl: './capture-username-form.component.html',
  styleUrls: ['./capture-username-form.component.scss']
})
export class CaptureUsernameFormComponent implements OnDestroy  {
  @Input() loginEmail: any = {};
  public isLoading: boolean = false;

  environment = environment;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AdminAuthService,
    private router: Router,
    public loggerService: LoggerService) { }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.loginEmail;
    this.isLoading = true;

    this.authService.findUser(email.toLowerCase()).pipe(takeUntil(this.ngUnsubscribe)).subscribe((user) => {
      if (!user) {
        this.isLoading = false;
      } else {
        this.authService.setUser(user);

        if (user.firebaseUID) {
          this.isLoading = false;
          this.router.navigate(['capture-password-form']);
        } else {
          this.isLoading = false;
          this.router.navigate(['create-auth-form']);
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
