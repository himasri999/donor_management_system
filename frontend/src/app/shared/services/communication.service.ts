import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Communication {
  id?: number;
  donor_id: number;
  message: string;
  donor_name?: string;
  communication_date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  constructor(private http: HttpClient) {}

  getCommunications(): Observable<Communication[]> {
    return this.http.get<Communication[]>(`${environment.apiUrl}/communications`);
  }

  createCommunication(communication: Communication): Observable<Communication> {
    return this.http.post<Communication>(`${environment.apiUrl}/communications`, communication);
  }

  updateCommunication(id: number, communication: Communication): Observable<Communication> {
    return this.http.put<Communication>(`${environment.apiUrl}/communications/${id}`, communication);
  }

  deleteCommunication(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/communications/${id}`);
  }
}