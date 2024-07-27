import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaritemsService {
  private apiUrl = 'http://localhost:3001/api/cargar'; // Cambia esta URL según sea necesario

  constructor(private http: HttpClient) { }

  // Obtener todos los videojuegos
  getAllVideojuegos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/videojuegos`);
  }

  // Obtener todos los descuentos
  getAllDescuentos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/descuentos`);
  }

  // Obtener un descuento por código
  getDescuentoByCodigo(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/descuentos/${codigo}`);
  }

  // Obtener un descuento por parámetro de consulta
  getDescuentoByCodigoParam(codigo: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/des?codigo=${codigo}`);
  }
}
