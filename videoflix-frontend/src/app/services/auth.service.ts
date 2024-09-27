import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rememberMe: boolean = false;

  constructor(private http: HttpClient) { }

  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": username,
      "password": password,
    };
    let Response = lastValueFrom(this.http.post(url, body));
    console.log(Response);
    return Response;

  }

  async ResponseRegister(username: string, email: string, password: string){
    const url = environment.baseUrl + '/register/';
    const body = {
      "username": username,
      "email": email,
      "password": password,
    };
    const headers = {
      'Content-Type': 'application/json'
    }
    return lastValueFrom(this.http.post(url, body, { headers }));
  }

}


