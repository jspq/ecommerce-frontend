export class ProductRequestDTO {
    name: string;
    description: string;
    price: number;
    catalogId: number;
    isActive: boolean;
  
    constructor(
      name: string = '',
      description: string = '',
      price: number = 0,
      catalogId: number = 0,
      isActive: boolean = true
    ) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.catalogId = catalogId;
      this.isActive = isActive;
    }
  }