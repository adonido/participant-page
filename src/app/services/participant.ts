
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
export interface Participant {
  id?: number;
  name: string;
  bic: string;
  shortName: string;
  email: string;
 phoneNumber: string;
  status: string;
 logoPath?: string | null;
}
export interface ParticipantResponse {
  status: string;
  message: string;
  institution: Participant;
  success: string;
}
@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl = 'http://localhost:9081/api/v1/participants';

  constructor(private http: HttpClient) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<{institutions: Participant[]}>(this.apiUrl).pipe(
      map(response => response.institutions)
    );
  }

 addParticipant(participant: Participant): Observable<ParticipantResponse> {
  return this.http.post<ParticipantResponse>(this.apiUrl, participant);
}

  
  getParticipantById(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  updateParticipant(id: number, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant);
  }

  deleteParticipant(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
uploadLogo(id: number, file: File): Observable<Participant> {

  const formData = new FormData();

  formData.append('logo', file);

  return this.http.post<Participant>(
    `${this.apiUrl}/${id}/logo`,
    formData
  );
}
}
