import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../model/product';
import { ProductCategory } from '../model/product-category';
import { ProductService } from '../service/product.service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-product-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css'],
  providers: [ProductService, CartService],
})
export class ProductCategoryComponent implements OnInit {
  public productsCategory: ProductCategory[] = [];
  public selectedProduct: Product | null = null;


  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void{
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getData().subscribe({
      next: (data: ProductCategory[]) => {
        console.log("Fresh data received:", data);
        this.productsCategory = data;
      },
      error: (err) => console.error("Error loading products", err)
    });
  }

  addToCart(product: Product): void {

  const priceValue = typeof product.price === 'string'
    ? parseFloat(product.price.replace(/[₱,]/g, ''))
    : product.price;

  const cartItem = {
    productId: product.id,
    productName: product.name,
    productDescription: product.description,
    productCategoryName: product.categoryName,
    productUnitOfMeasure: product.unitOfMeasure,
    productImageFile: product.imageFile,
    price: priceValue,
    quantity: 1,
    // status: 'Created',
    status: 0,
    customerId: 1
  };

  this.cartService.addToCart(cartItem).subscribe({
    next: (res) => {
      console.log('Cart item added successfully:', res);
      alert(`${product.name} has been added to your cart.`);
      this.router.navigate(['/cart']);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
      console.error('Error details:', {
        status: err.status,
        message: err.message,
        url: err.url,
        cartItem: cartItem
      });
      alert(`Failed to add item to cart. Error: ${err.status || 'Unknown'} - ${err.message || 'Check console for details'}. Make sure the backend is running at http://localhost:8080`);
    }
  });
}

unlockScroll(): void {
  document.body.style.overflow = '';
}

openProductModal(product: Product): void {
    this.selectedProduct = product;
    document.body.style.overflow = 'hidden';
  }

closeProductModal(event?: MouseEvent): void {
  const target = event?.target as HTMLElement;
  if (!event || target.classList.contains('modal')) {
    this.selectedProduct = null;
    this.unlockScroll();
  }
}

onCloseClick(): void {
  this.selectedProduct = null;
  this.unlockScroll();
}

onAddToCart(product?: Product | null): void {
  if (!product) return;
  this.selectedProduct = null;
  this.unlockScroll();
  this.addToCart(product);
}

zoomActive = false;

onImageHover(event: MouseEvent, img: HTMLImageElement): void {
  if (!this.zoomActive) return;

  const rect = img.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;

  img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
}

toggleZoom(img: HTMLImageElement): void {
  this.zoomActive = !this.zoomActive;
  if (this.zoomActive) {
    img.classList.add('zoomed');
  } else {
    img.classList.remove('zoomed');
    img.style.transformOrigin = 'center center';
  }
}

resetZoom(img: HTMLImageElement): void {
  if (!this.zoomActive) {
    img.classList.remove('zoomed');
    img.style.transformOrigin = 'center center';
  }
}



}
