import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductRequestDTO } from 'src/app/models/add-product-request.dto';
import { ConfirmOrderDTO } from 'src/app/models/confirm-order.dto';
import { OrderProductSummary } from 'src/app/models/order-product-sumary.dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  addProductToCart(request: AddProductRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.url}/add`, request);
  }

  confirmOrder(userId: number): Observable<void> {
    return this.http.post<void>(`${this.url}/confirm/${userId}`, {});
  }

  getOrderSummary(userId: number): Observable<OrderProductSummary[]> {
    return this.http.get<OrderProductSummary[]>(`${this.url}/summary/${userId}`);
  }

  getOrderHistory(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/history/${userId}`);
  }
}
