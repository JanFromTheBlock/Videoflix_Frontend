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

  /**
   * This function sends the backend request to log in the user
   *
   * @param {string} username - username for the login
   * @param {string} password - password for the login
   * @returns - the response of the backend
   */
  public loginWithUsernameAndPassword(username: string, password: string) {
    const url = environment.baseUrl + '/login/';
    const body = {
      "username": username,
      "password": password,
    };
    let Response = lastValueFrom(this.http.post(url, body));
    return Response;
  }

  /**
   * This function sends the backend request to register the user
   *
   * @param {string} username - username for the register
   * @param {string} email - email for the register
   * @param {string} password - password for the register
   * @returns the response of the backend
   */
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


