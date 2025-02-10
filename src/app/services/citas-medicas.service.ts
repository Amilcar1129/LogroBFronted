import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitasMedicasService {

    private apiUrl = 'http://localhost:3000/api/citas'; 
  
    constructor(private http: HttpClient) { }
  
    //  Obtener todas las cita
    getCitas(): Observable<any> {
      return this.http.get(this.apiUrl);
    }
  
    // filtrr por la fecha y especialidad
    getCitasFiltradas(fecha: string, especialidadId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}?fecha=${fecha}&especialidadId=${especialidadId}`);
    }
  
    //  Registrara nueva cita
    registerCita(paciente: string, fecha: string, especialidadId: number): Observable<any> {
      const data = { paciente, fecha, especialidadId };
      return this.http.post(this.apiUrl, data);
    }
  
    //  editar una cita
    updateCita(id: number, paciente: string, fecha: string, especialidadId: number): Observable<any> {
      const data = { paciente, fecha, especialidadId };
      return this.http.put(`${this.apiUrl}/${id}`, data);
    }
  
    // Reasignar especialidad a una cita
    updateEspecialidadCita(id: number, especialidadId: number): Observable<any> {
      return this.http.patch(`${this.apiUrl}/${id}/especialidad`, { especialidadId });
    }
  

    getEspecialidades(): Observable<any> {
      return this.http.get(`${this.apiUrl}/especialidades`); // Endpoint del backend
    }
  }