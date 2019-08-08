import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Chat} from '../model/chat';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public url:string;
  constructor(public _http:HttpClient) {
    this.url = GLOBAL.url;
   }
   prueba(chat:Chat):Observable<any>{

   let params = JSON.stringify(chat);
   let headers = new HttpHeaders().set('Content-Type','application/json');
   return this._http.post(this.url+'enviarMensaje', params, {headers:headers});
 
 }
}
