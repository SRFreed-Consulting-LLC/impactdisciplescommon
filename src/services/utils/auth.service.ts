import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { UserCredential } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AppUserService } from '../admin/user.service';
import { FireAuthDao } from '../../dao/fireauth.dao';
import { LoggerService } from './logger.service';
import { SessionService } from './session.service';
import { AppUser } from '../../models/admin/appuser.model';
import { LogMessage } from '../../models/utils/log-message.model';
import { CookieService } from 'ngx-cookie-service';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

const defaultPath = '/';

const COOKIE_NAME = "impact-disciples-admin"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: AppUser;

  get loggedIn(): boolean {
    return this.cookieService.check(COOKIE_NAME);
  }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  get lastAuthenticatedPath(): string {
    return this._lastAuthenticatedPath;
  }

  constructor(private router: Router, public dao: FireAuthDao, public userService: AppUserService, private cookieService: CookieService,
    public loggerService: LoggerService, public tostrService: ToastrService, private sessionService: SessionService) { }

  findUser(email: string): Observable<AppUser> {
    return from(this.userService.getAllByValue('email', email)).pipe(
      switchMap(user => {
        if(user && user.length == 1){
          return of(user[0]);
        } else {
          return this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', []).pipe(
            switchMap((ec: any) => {
              this.tostrService.error(
                'The email address (' +
                  email +
                  ') is not recognized. Correct the Email Address and Try again. If the problem continues, please contact your Admin for assistance with this code: ' +
                  ec,
                'Login Error',
                { disableTimeOut: true }
              );
              return of(null);
            })
          );
        }
      })
    );
  }

  logIn(email: string, password: string): Observable<any> {
    try {
      this.cookieService.delete(COOKIE_NAME);

      return from(this.dao.signIn(email.toLowerCase(), password)).pipe(
        switchMap((result: UserCredential) => {
          if(result.user){
            return from(this.userService.getAllByValue('email', email)).pipe(
              switchMap(user => {
                if(user && user.length == 1) {
                  return from(result.user.getIdTokenResult()).pipe(
                    map(token => {
                      this.user = user[0];
                      this.router.navigate([this._lastAuthenticatedPath]);
                      this.cookieService.set(COOKIE_NAME, JSON.stringify(this.user), new Date(token.expirationTime));

                      return {
                        isOk: true,
                        data: this.user,
                        message: "Authentication success"
                      };
                    })
                  );

                } else {
                  return of({
                    isOk: false,
                    data: null,
                    message: "Authentication failed"
                  });
                }
              })
            );
          } else {
            return of({
              isOk: false,
              data: null,
              message: "Authentication failed"
            });
          }
        }),
        catchError((err) => {
          if (err.code == 'auth/wrong-password') {
            return this.logMessage('LOGIN', email, 'You have entered an incorrect password for this email address.', [
              { ...err }
            ]).pipe(
              switchMap((ec: any) => {
                this.tostrService.error(
                  'You have entered an incorrect password for this email address. If you have forgotten your password, enter your Email Address and press the "Forgot Password" button. If the problem continues, please contact Alliance Group for assistance with this code: ' +
                    ec,
                  'Login Error',
                  { disableTimeOut: true }
                );
                return of({
                  isOk: false,
                  data: null,
                  message: "Authentication failed"
                });
              })
            );
          } else if (err.code == 'auth/user-not-found') {
            return this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', [{ ...err }]).pipe(
              switchMap((ec: any) => {
                this.tostrService.error(
                  'The email address (' +
                    email +
                    ') is not recognized. Correct the Email Address and Try again. If the problem continues, please contact your Admin for assistance with this code: ' +
                    ec,
                  'Login Error',
                  { disableTimeOut: true }
                );
                return of({
                  isOk: false,
                  data: null,
                  message: "Authentication failed"
                });
              })
            );
          } else if (err.code == 'auth/too-many-requests') {
            return this.logMessage('LOGIN', email, 'Too many failed attempts. The account is temporarily locked.', [
              { ...err }
            ]).pipe(
              switchMap((ec: any) => {
                this.tostrService.error(
                  'There have been too many failed logins to this account. Please reset your password by going to the login screen, entering your password, and pressing the "Forgot Password" button. If the problem continues, please contact your Admin for assistance with this code: ' +
                    ec,
                  'Login Error',
                  { disableTimeOut: true }
                );
                return of({
                  isOk: false,
                  data: null,
                  message: "Authentication failed"
                });
              })
            );
          } else {
            return this.logMessage('LOGIN', email, 'The email address (' + email + ') is not recognized.', [{ ...err }]).pipe(
              switchMap((ec: any) => {
                this.tostrService.error(
                  'There was an Error accessing your account. Please contact your Admin for Assistance with this code: ' +
                    ec,
                  'Login Error',
                  { disableTimeOut: true }
                );
                return of({
                  isOk: false,
                  data: null,
                  message: "Authentication failed"
                });
              })
            );
          }
        })
      );
    }
    catch {
      return of({
        isOk: false,
        message: "Authentication failed"
      });
    }
  }

  getUser(): Observable<AppUser> {
    const cookieValue = this.cookieService.get(COOKIE_NAME);
    let user: AppUser = null;
  
    try {
      if (cookieValue) {
        user = JSON.parse(cookieValue);
      }
    } catch (error) {
      console.error('Error parsing cookie JSON', error);
    }
  
    return of(user);
  }

  createAccount(email: string, password: string): Observable<any> {
    try {
      return from(this.dao.register(email.toLowerCase(), password)).pipe(
        switchMap((result: UserCredential) => {
          if(result.user){
            return from(this.userService.getAllByValue('email', email)).pipe(
              switchMap(async appuser => {
                if(appuser && appuser.length == 1){
                  let u: AppUser = appuser[0];

                  u.firebaseUID = result.user.uid;

                  await this.userService.update(u.id, u);

                  return {
                    isOk: true,
                    message: "Account Successfully Created"
                  };
                } else {
                  return {
                    isOk: false,
                    message: "More than 1 User Account was found for this email address"
                  };
                }
              })
            );
          } else {
            return of({
              isOk: false,
              message: "Failed to create account: "
            });
          }
        })
      );
    }
    catch {
      return of({
        isOk: false,
        message: "Failed to create account"
      });
    }
  }

  changePassword(email: string, recoveryCode: string): Observable<any> {
    try {
      // Send request

      return of({
        isOk: true
      });
    }
    catch {
      return of({
        isOk: false,
        message: "Failed to change password"
      });
    }
  }

  resetPassword(email: string): Observable<any> {
    try {
      // Send request

      return of({
        isOk: true
      });
    }
    catch {
      return of({
        isOk: false,
        message: "Failed to reset password"
      });
    }
  }

  logOut(): void {
    this.sessionService.currentUser = null;
    this.user = null;
    this.cookieService.delete(COOKIE_NAME);
  }

  private logMessage(type: string, created_by: string, message: string, data?: any): Observable<any> {
    try {
      let ec = this.generateErrorCode();
      let logMessage: LogMessage = { ...new LogMessage(type, created_by, message, ec, data) };
      logMessage.id = this.generateErrorCode();

      return from(this.loggerService.add(logMessage)).pipe(
        map(() => {
          return ec;
        })
      );
    } catch (err) {
      console.error(err);

      return of(true);
    }
  }

  private generateErrorCode() {
    return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

@Injectable({
  providedIn: 'root'
})
//TODO: See why CanActivate is deprecated and update
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let isLoggedIn = this.authService.loggedIn;

    const isAuthForm = [
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
      'capture-username-form',
      'capture-password-form',
      'create-auth-form'
    ].includes(route.routeConfig?.path || defaultPath);

    if (isLoggedIn && isAuthForm) {
      this.authService.lastAuthenticatedPath = defaultPath;
      this.router.navigate([defaultPath]);
      return false;
    }

    if (!isLoggedIn && !isAuthForm) {
      this.router.navigate(['/capture-username-form']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
