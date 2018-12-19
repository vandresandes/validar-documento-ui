import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  url: string = "/recaptcha/";

  constructor(private http : HttpClient) { }

  post(response: string) {
    return this.http.post(`/recaptcha/${response}/false`, null).pipe(res=> res);
  }

}
