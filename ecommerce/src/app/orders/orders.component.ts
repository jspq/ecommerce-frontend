import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { AuthService } from '../services/authorization/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  userId: number = 1;

  constructor(private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() ?? 0;
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    this.orderService.getOrderHistory(this.userId).subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error al cargar el historial de órdenes:', error);
      }
    );
  }
}
