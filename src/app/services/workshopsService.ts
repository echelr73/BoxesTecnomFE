import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workshop } from '../shared/models/workshop.model';

@Injectable({
  providedIn: 'root',
})
export class WorkshopsService {

  private apiUrl = 'https://localhost:7173/api/workshops';
  
  constructor(private http: HttpClient) {}

  getWorkshops() {
    return this.http.get<Workshop[]>(this.apiUrl);
  }
  
}
