import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CodigoValidacaoService {

  constructor(private httpClient: HttpClient) { }

  get(url: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ZWNtOkNkMHBQZzM='
      })
    };
    return this.httpClient.get(url, httpOptions).pipe(res=> res);
  }
}
