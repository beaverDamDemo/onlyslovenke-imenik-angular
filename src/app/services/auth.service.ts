import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthInterface, UserInterface } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthFormValue } from '../interfaces/authFormValue.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<any | null>(undefined);
  private stateItem: BehaviorSubject<any | null> = new BehaviorSubject(null);
  stateItem$: Observable<any | null> = this.stateItem.asObservable();

  private API_URL = environment.API_URL;

  constructor(private http: HttpClient, private router: Router) {

    const token = localStorage.getItem('token') ?? '';

    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      // ASP.NET Identity puts the username in this claim:
      const username = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      console.log('Decoded payload:', payload);
      console.log('Username:', username);
      this.currentUserSig.set(username);
    } else {
      this.currentUserSig.set(null);
    }
  }

  private authRequest(path: string, authFormValue: any) {
    const { email, username, password, confirmPassword } = authFormValue;
    return this.http.post<UserAuthInterface>(
      `${this.API_URL}/auth/${path}`,
      { email, username, password, confirmPassword }
    );
  }

  login(authFormValue: AuthFormValue) {
    return this.authRequest('login', authFormValue);
  }

  register(authFormValue: AuthFormValue) {
    return this.authRequest('register', authFormValue);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSig.set(null);
    console.log("Going to login");
    this.router.navigate(['/login']);
  }

  get(): Observable<UserInterface | null> {
    return this.http.get<UserInterface>(`${this.API_URL}/auth/profile`);
  }

  SetState(item: any) {
    this.stateItem.next(item);
  }
}
