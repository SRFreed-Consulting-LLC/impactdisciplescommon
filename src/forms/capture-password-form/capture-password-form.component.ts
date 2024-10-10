import { Component, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/utils/auth.service';
import { SessionService } from '../../services/utils/session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-capture-password-form',
  templateUrl: './capture-password-form.component.html',
  styleUrls: ['./capture-password-form.component.scss']
})
export class CapturePasswordFormComponent implements OnDestroy {
  loginEmail: string = '';
  loginPassword: any = {};
  public isLoading: boolean = false;

  private ngUnsubscribe = new Subject<void>();

  constructor(private authService: AuthService, public tostrService: ToastrService, private sessionService: SessionService) { }

  onSubmit(e: Event) {
    e.preventDefault();
    const { password } = this.loginPassword;
    this.isLoading = true;

    if(this.loginEmail === '') {
      this.loginEmail = this.sessionService.currentUser.email;
    }

    this.authService.logIn(this.loginEmail, password).pipe(takeUntil(this.ngUnsubscribe)).subscribe((result) => {
      if (!result.isOk) {
        this.tostrService.error('There was an error trying to log in: ' + result.message);
      }
      this.isLoading = false;
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
