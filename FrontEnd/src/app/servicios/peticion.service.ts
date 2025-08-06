import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) { }

  urlReal:string = "http://localhost:3000"
  requestOptions:any = {}

  post(url:string,payload:{}){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""                                       CABECERAS
        }),withCredentials:true                         //PARA PODER HACER LOGIN
      }

      this.http.post(url,payload,this.requestOptions).toPromise()
      .then((res:any) => {
        resolve(res)
      }).catch((error:any) => {
        reject(error)
      })
    })
    return promise
  }

  get(url:string){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""                                       CABECERAS
        }),withCredentials:true                         //PARA PODER HACER LOGIN
      }

      this.http.get(url,this.requestOptions).toPromise()
      .then((res:any) => {
        resolve(res)
      }).catch((error:any) => {
        reject(error)
      })
    })
    return promise
  }

  put(url:string,payload:any){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""                                       CABECERAS
        }),withCredentials:true                         //PARA PODER HACER LOGIN
      }

      this.http.put(url,payload,this.requestOptions).toPromise()
      .then((res:any) => {
        resolve(res)
      }).catch((error:any) => {
        reject(error)
      })
    })
    return promise
  }

  delete(url: string,payload:any){
    let promise = new Promise((resolve, reject) => {
      this.requestOptions = {
        headers: new HttpHeaders({
          //"":""                                       CABECERAS
        }),withCredentials:true,
        body:payload                         //PARA PODER HACER LOGIN
      }

      this.http.request("delete",url,this.requestOptions).toPromise()
      .then((res:any) => {
        resolve(res)
      }).catch((error:any) => {
        reject(error)
      })
    })
    return promise
  }
}
