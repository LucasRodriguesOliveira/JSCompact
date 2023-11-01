import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface IMessage {
  string: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly url: string = 'https://api.neopro.com.br/v1/test/compact';

  constructor(private readonly http: HttpClient) {}

  getMessage(): Observable<string> {
    return this.http.get<IMessage>(this.url)
      .pipe(map((message: IMessage) => message.string));
  }
}
