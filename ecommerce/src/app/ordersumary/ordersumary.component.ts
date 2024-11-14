import { Component, OnInit } from '@angular/core';
import { OrderProductSummary } from '../models/order-product-sumary.dto';
import { OrderService } from '../services/order/order.service';
import { AuthService } from '../services/authorization/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersumary',
  templateUrl: './ordersumary.component.html',
  styleUrls: ['./ordersumary.component.css']
})
export class OrdersumaryComponent implements OnInit {
  orderProducts: any[] = [];
  totalPrice: number = 0;
  userId: number = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId() ?? 0;
    this.getOrderSummary();
  }
  getOrderSummary(): void {
    this.orderService.getOrderSummary(this.userId).subscribe(
      (response) => {
        this.orderProducts = response;
        this.calculateTotalPrice();
      },
      (error) => {
        console.error('Error al obtener el resumen de la orden', error);
      }
    );
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.orderProducts.reduce(
      (sum, product) => sum + (product.amount * product.price),
      0
    );
  }

  payOrder(): void {
    this.orderService.confirmOrder(this.userId).subscribe(
      (response) => {
        console.log('Orden pagada con éxito', response);
        Swal.fire({
          title: '¡Pago exitoso!',
          text: 'Tu orden ha sido procesada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          this.router.navigate(['/products']);
        });
      },
      (error) => {
        console.error('Error al pagar la orden', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al procesar el pago, por favor intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    );
  }
}
