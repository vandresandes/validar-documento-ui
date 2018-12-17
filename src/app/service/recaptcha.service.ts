import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaService {

  private siteVerify: string = "/recaptcha/api/siteverify";
  private secretKey: string = "6Ldbwn4UAAAAAOmR4keKGDmqittT1FhjC1HgHEpv";
  private secretKeyInvisible: string = "6LeIyX4UAAAAAMjiKxC7h5a1SEWfOCatoGpkjovj";

  constructor(private http : HttpClient) { }


  post(response: string, invisible: boolean = true) {
    let params = `secret=${this.getSecretKey(invisible)}&response=${response}`;
    let url = `${this.siteVerify}?${params}`;
    return this.http.post(url, null).pipe(res=> res);
  }

  getSecretKey(invisible: boolean) {
    return invisible ? this.secretKeyInvisible : this.secretKey;
  }

}
