import { Component, OnInit } from '@angular/core';
import { ProductResponseDTO } from '../models/product-response.dto';
import { ProductService } from '../services/product/product.service';
import { OrderService } from '../services/order/order.service';
import { AuthService } from '../services/authorization/auth.service';
import { AddProductRequestDTO } from '../models/add-product-request.dto';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: ProductResponseDTO[] = [];

  userId: number = 0;
  constructor(private productService: ProductService,
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.userId = this.authService.getUserId() || 0;
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.log('Error al cargar los productos', error);
      }
    )
  }

  addProductToCart(productId: number, amount: number): void {
    const request: AddProductRequestDTO = { userId: this.userId, productId, amount };
    this.orderService.addProductToCart(request).subscribe(
      () => {
        console.log('Producto agregado al carrito');
      },
      (error) => {
        console.error('Error al agregar el producto al carrito', error);
      }
    );
  }
}
