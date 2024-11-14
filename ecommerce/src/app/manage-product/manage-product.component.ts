import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductRequestDTO } from '../models/product-request.dto';
import { CatalogService } from '../services/catalog/catalog.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  product: ProductRequestDTO = { name: '', description: '', price: 0, catalogId: 0, isActive: true };
  catalogs: { id: number; name: string }[] = [];
  isEditMode: boolean = false;

  constructor(
    private productService: ProductService,
    private catalogService: CatalogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCatalogs();
    const action = this.route.snapshot.paramMap.get('action');
    if (action === 'edit') {
      this.isEditMode = true;
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.getProduct(productId).subscribe((response) => {
        this.product = response;
      });
    }
  }

  loadCatalogs(): void {
    this.catalogService.getAllCatalogs().subscribe((data) => {
      this.catalogs = data;
    });
  }

  saveProduct(): void {
    if (this.isEditMode) {
      const productId = Number(this.route.snapshot.paramMap.get('id'));
      this.productService.updateProduct(productId, this.product).subscribe(() => {
        Swal.fire('Actualizado', 'Producto actualizado con éxito.', 'success');
        this.router.navigate(['/inventory']);
      });
    } else {
      this.productService.createProduct(this.product).subscribe(() => {
        Swal.fire('Creado', 'Producto creado con éxito.', 'success');
        this.router.navigate(['/inventory']);
      });
    }
  }
}
