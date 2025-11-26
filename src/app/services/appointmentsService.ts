import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from '../shared/models/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {

  private apiUrl = 'https://localhost:7173/api/appointments';
  
  constructor(private http: HttpClient) {}

  getAppointments() {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  createAppointment(appointmentData: any) {
    return this.http.post(this.apiUrl, appointmentData);
  }
  
}
