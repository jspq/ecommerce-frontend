import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductRequestDTO } from 'src/app/models/product-request.dto';
import { ProductResponseDTO } from 'src/app/models/product-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductResponseDTO[]> {
    return this.http.get<ProductResponseDTO[]>(this.url);
  }

  getProduct(id: number): Observable<ProductResponseDTO> {
    return this.http.get<ProductResponseDTO>(`${this.url}/${id}`);
  }

  createProduct(product: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.post<ProductResponseDTO>(this.url, product);
  }

  updateProduct(id: number, product: ProductRequestDTO): Observable<ProductResponseDTO> {
    return this.http.put<ProductResponseDTO>(`${this.url}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
