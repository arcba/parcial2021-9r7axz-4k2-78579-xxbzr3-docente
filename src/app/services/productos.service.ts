import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'https://pymesbackend.azurewebsites.net/api/productos/';
  }

  get(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url);
  }
  post(prod: Producto) {
    return this.http.post(this.url, prod);
  }
}
