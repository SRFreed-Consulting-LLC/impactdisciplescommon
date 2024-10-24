import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'impactdisciplescommon/src/services/utils/auth.service';
import { SessionService } from '../../services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-capture-username-form',
  templateUrl: './capture-username-form.component.html',
  styleUrls: ['./capture-username-form.component.scss']
})
export class CaptureUsernameFormComponent implements OnDestroy  {
  @Input() loginEmail: any = {};
  public isLoading: boolean = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService, private router: Router, public tostrService: ToastrService, private sessionService: SessionService) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email } = this.loginEmail;
    this.isLoading = true;

    this.authService.findUser(email).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
         if (!result) {
        this.isLoading = false;
        this.tostrService.error('A User account associated with that Email Address could not be found. Please Contact Impact Disciples for help.');
      } else {
        this.sessionService.currentUser = result;

        if (result.firebaseUID) {
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
