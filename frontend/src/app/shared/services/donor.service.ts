import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Donor {
  id?: number;
  name: string;
  email: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  constructor(private http: HttpClient) {}

  getDonors(): Observable<Donor[]> {
    return this.http.get<Donor[]>(`${environment.apiUrl}/donors`);
  }

  createDonor(donor: Donor): Observable<Donor> {
    return this.http.post<Donor>(`${environment.apiUrl}/donors`, donor);
  }

  updateDonor(id: number, donor: Donor): Observable<Donor> {
    return this.http.put<Donor>(`${environment.apiUrl}/donors/${id}`, donor);
  }

  deleteDonor(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/donors/${id}`);
  }
}