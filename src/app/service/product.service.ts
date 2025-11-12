import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { Observable, of } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../model/product-category';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService {

  constructor(protected override http: HttpClient) {
    super(http, '/api/product');
  }

  override getData(): Observable<ProductCategory[]> {
    return super.getData().pipe(
      map((response: any) => {
//         if (Array.isArray(response) && response.length > 0) {
//           return response as ProductCategory[];
//         }
        return this.getFallbackProducts();
      }),
      catchError(() => of(this.getFallbackProducts()))
    );
  }

  private getFallbackProducts(): ProductCategory[] {
    return [
      {
        categoryName: 'Earrings',
        products: [
          {
            id: 1,
            name: 'Dango-Inspired Dangling Earring',
            description: 'Sweet, petite, and utterly charming! • For eKawaii style everyday look',
            categoryName: 'Earring',
            imageFile: '../../assets/products/dango.PNG',
            price: '50.00',
            unitOfMeasure: '100ml'
          },
          {
            id: 2,
            name: 'Black Dice Dangling Earring',
            description: 'Y2K Collection • Edgy and slightly rebellious Y2K look',
            categoryName: 'Earring',
            imageFile: '../../assets/products/black-dice.PNG',
            price: '30.00',
            unitOfMeasure: '100ml'
          },
          {
            id: 3,
            name: 'White Dice Dangling Earring',
            description: 'Y2K Collection • Edgy and slightly rebellious Y2K look',
            categoryName: 'Earring',
            imageFile: '../../assets/products/white-dice.PNG',
            price: '30.00',
            unitOfMeasure: '100ml'
          },
          {
            id: 4,
            name: 'Star Version 1 Dangling Earring',
            description: 'Y2K Collection • A classic, vibrant star design that channels pure 2000s energy',
            categoryName: 'Earring',
            imageFile: '../../assets/products/starv1.PNG',
            price: '15.00',
            unitOfMeasure: '100ml'
          },
          {
            id: 5,
            name: 'Pink Lotus Keychain',
            description: 'Carry tranquility wherever you gor',
            categoryName: 'Keychains',
            imageFile: '../../assets/products/pink-lotus.PNG',
            price: '70.00',
            unitOfMeasure: '100ml'
          }
        ]
      },
      {
        categoryName: 'Keychains',
        products: [
          {
            id: 6,
            name: 'Blue Lotus Keychain',
            description: 'Carry tranquility wherever you go',
            categoryName: 'Keychains',
            imageFile: '../../assets/products/blue-lotus.PNG',
            price: '70.00',
            unitOfMeasure: '100ml'
          }
        ]
      }
    ];
  }
}
