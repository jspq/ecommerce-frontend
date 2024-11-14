import { Component, OnInit } from '@angular/core';
import { CatalogResponseDTO } from '../models/catalog-response';
import { CatalogRequestDTO } from '../models/catalog-request.dto';
import { CatalogService } from '../services/catalog/catalog.service';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit {
categories: CatalogResponseDTO[] = [];
  newCategoryName: string = '';

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.catalogService.getAllCatalogs().subscribe(
      (categories: CatalogResponseDTO[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  addCategory(): void {
    const newCategory: CatalogRequestDTO = { name: this.newCategoryName };
    this.catalogService.createCategory(newCategory).subscribe(
      (category: CatalogResponseDTO) => {
        this.categories.push(category);
        this.newCategoryName = '';
      },
      (error: any) => {
        console.error('Error creating category:', error);
      }
    );
  }

  deleteCategory(categoryId: number): void {
    this.catalogService.deleteCategory(categoryId).subscribe(
      () => {
        this.categories = this.categories.filter(category => category.id !== categoryId);
      },
      (error: any) => {
        console.error('Error deleting category:', error);
      }
    );
  }
}
