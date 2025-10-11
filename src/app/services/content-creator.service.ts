import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentCreator } from '../models/content-creator.model';

@Injectable({
  providedIn: 'root'
})
export class ContentCreatorService {
  private apiUrl = 'http://localhost:8080/api/content-creators';

  constructor(private http: HttpClient) { }

  getAllCreators(): Observable<ContentCreator[]> {
    return this.http.get<ContentCreator[]>(this.apiUrl);
  }

  getCreatorById(id: number): Observable<ContentCreator> {
    return this.http.get<ContentCreator>(`${this.apiUrl}/${id}`);
  }

  addCreator(dto: ContentCreator): Observable<ContentCreator> {
    return this.http.post<ContentCreator>(this.apiUrl, dto);
  }

  updateCreator(id: number, dto: ContentCreator): Observable<ContentCreator> {
    return this.http.put<ContentCreator>(`${this.apiUrl}/${id}`, dto);
  }

  deleteCreator(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
