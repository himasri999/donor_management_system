import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Donation {
  id?: number;
  donor_id: number;
  amount: number;
  donor_name?: string;
  donation_date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  constructor(private http: HttpClient) {}

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(`${environment.apiUrl}/donations`);
  }

  createDonation(donation: Donation): Observable<Donation> {
    return this.http.post<Donation>(`${environment.apiUrl}/donations`, donation);
  }

  updateDonation(id: number, donation: Donation): Observable<Donation> {
    return this.http.put<Donation>(`${environment.apiUrl}/donations/${id}`, donation);
  }

  deleteDonation(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/donations/${id}`);
  }
}