import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems = signal<CartItem[]>([]);

  addToCart(product: Product): void {
    const items = this.cartItems();
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
      this.cartItems.set([...items]);
    } else {
      this.cartItems.set([...items, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string): void {
    this.cartItems.set(this.cartItems().filter(i => i.product.id !== productId));
  }

  getTotalItems(): number {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
