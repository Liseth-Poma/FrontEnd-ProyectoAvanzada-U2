import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = 'http://localhost:3001/api/formulario'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los formularios
  getAllFormularios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/`);
  }

  // Obtener un formulario por ID
  getFormularioById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo formulario
  createFormulario(formulario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, formulario);
  }

  // Actualizar un formulario existente
  updateFormulario(id: string, formulario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formulario);
  }

  // Eliminar un formulario
  deleteFormulario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
