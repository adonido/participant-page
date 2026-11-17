
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Participant {
  id?: number;
  name: string;
  bic: string;
  shortName: string;
  email: string;
  phone: string;
  status: string;
  logo?: string | null;
logoContentType?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl = 'http://localhost:9081/api/v1/participants';

  constructor(private http: HttpClient) {}

  // GET: Retrieve all participants
  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl);
  }

  // POST: Add a participant
  addParticipant(participant: Participant): Observable<Participant> {
    return this.http.post<Participant>(this.apiUrl, participant);
  }

  // GET: Retrieve participant by ID
  getParticipantById(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  // PUT: Update participant
  updateParticipant(id: number, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant);
  }

  // DELETE: Delete participant
  deleteParticipant(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
  // POST: Upload participant logo
uploadLogo(id: number, file: File): Observable<Participant> {

  const formData = new FormData();

  formData.append('file', file);

  return this.http.post<Participant>(
    `${this.apiUrl}/${id}/logo`,
    formData
  );
}
}
