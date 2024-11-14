import { Component, OnInit } from '@angular/core';
import { ProductResponseDTO } from '../models/product-response.dto';
import { ProductService } from '../services/product/product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  products: ProductResponseDTO[] = [];

  constructor(private productService: ProductService, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }

  createProduct(): void {
    this.router.navigate(['/manage-product', { action: 'create' }]);
  }

  editProduct(productId: number): void {
    this.router.navigate(['/manage-product', { action: 'edit', id: productId }]);
  }

  deleteProduct(productId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(() => {
          Swal.fire('Eliminado', 'Producto eliminado con éxito.', 'success');
          this.loadProducts();
        });
      }
    });
  }
}
