import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.css'
})
export class CartModalComponent {
  @Output() close = new EventEmitter<void>();

  constructor(public cartService: CartService) {}

  onClose(): void {
    this.close.emit();
  }

  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId);
  }
}
