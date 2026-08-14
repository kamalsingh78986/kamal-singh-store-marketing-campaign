import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() storeName: string = 'John Doe Store';
  @Output() searchChange = new EventEmitter<string>();
  @Output() cartClick = new EventEmitter<void>();

  searchTerm: string = '';

  constructor(public cartService: CartService) {}

  onSearchInput(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onCartClick(): void {
    this.cartClick.emit();
  }
}
