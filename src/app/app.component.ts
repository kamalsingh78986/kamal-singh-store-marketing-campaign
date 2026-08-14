import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { SeoService } from './services/seo.service';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    ProductGridComponent,
    CartModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  storeName = 'John Doe Store';
  categories: string[] = [];
  selectedCategory: string = 'All';
  searchTerm: string = '';
  allProducts: Product[] = [];
  displayedProducts: Product[] = [];
  isCartOpen: boolean = false;
  isLoading: boolean = true;

  constructor(
    private productService: ProductService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
      this.displayedProducts = products;
      this.categories = Array.from(new Set(products.map(p => p.category))).sort();
      this.isLoading = false;
      this.updateSeo();
    });

    this.updateSeo();
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
    this.searchTerm = '';
    this.displayedProducts =
      !category || category === 'All'
        ? this.allProducts
        : this.allProducts.filter(p => p.category === category);
    this.updateSeo();
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.selectedCategory = 'All';
    const lowerTerm = term.toLowerCase().trim();
    this.displayedProducts = !lowerTerm
      ? this.allProducts
      : this.allProducts.filter(
          p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description.toLowerCase().includes(lowerTerm) ||
            p.category.toLowerCase().includes(lowerTerm)
        );
    this.updateSeo();
  }

  onCartToggle(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  get gridTitle(): string {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      return `Search results for "${this.searchTerm}"`;
    }
    return this.selectedCategory === 'All' ? 'All Products' : this.selectedCategory;
  }

  private updateSeo(): void {
    const context =
      this.searchTerm?.trim()
        ? `Search results for "${this.searchTerm}"`
        : this.selectedCategory === 'All'
        ? 'All Products'
        : this.selectedCategory;

    this.seoService.update({
      title: `${this.storeName} | ${context} - Online Shopping, Best Deals & Free Shipping`,
      description: `Shop ${context} at ${this.storeName}. Great deals on Electronics, Clothing, Jewelery and more with fast shipping and secure checkout.`,
      keywords: `${this.storeName}, online store, buy online, ${this.categories.join(', ')}, deals, discount shopping, free shipping`,
      image: this.displayedProducts[0]?.imageUrl
    });
  }
}
