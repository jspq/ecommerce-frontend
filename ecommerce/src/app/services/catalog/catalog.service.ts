import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogRequestDTO } from 'src/app/models/catalog-request.dto';
import { CatalogResponseDTO } from 'src/app/models/catalog-response';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  private url = 'http://localhost:8080/api/catalog';
  constructor(private http: HttpClient) {}

  getAllCatalogs(): Observable<CatalogResponseDTO[]> {
    return this.http.get<CatalogResponseDTO[]>(`${this.url}`);
  }

  createCategory(category: CatalogRequestDTO): Observable<CatalogResponseDTO> {
    return this.http.post<CatalogResponseDTO>(this.url, category);
  }

  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${categoryId}`);
  }
}
