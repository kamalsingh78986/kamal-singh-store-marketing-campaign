import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * Raw shape returned by the Fake Store API
 * https://github.com/keikaavousi/fake-store-api
 */
interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://fakestoreapi.com/products';

  /** Cached, shared stream so every component subscribes to a single HTTP call */
  private products$: Observable<Product[]> | null = null;

  constructor(private http: HttpClient) {}

  /** Fetch (and cache) the full product catalog from the Fake Store API */
  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http.get<FakeStoreProduct[]>(this.apiUrl).pipe(
        map(items => items.map(this.mapToProduct)),
        catchError(() => of([])),
        shareReplay(1)
      );
    }
    return this.products$;
  }

  /** Derive the unique, capitalized category list from the live catalog */
  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map(products => {
        const unique = Array.from(new Set(products.map(p => p.category)));
        return unique.sort();
      })
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products =>
        !category || category === 'All'
          ? products
          : products.filter(p => p.category === category)
      )
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        if (!term || term.trim() === '') {
          return products;
        }
        const lowerTerm = term.toLowerCase().trim();
        return products.filter(
          p =>
            p.name.toLowerCase().includes(lowerTerm) ||
            p.description.toLowerCase().includes(lowerTerm) ||
            p.category.toLowerCase().includes(lowerTerm)
        );
      })
    );
  }

  /** Map the Fake Store API response into this app's Product model */
  private mapToProduct(item: FakeStoreProduct): Product {
    return {
      id: 'P' + String(item.id).padStart(3, '0'),
      name: item.title,
      description: item.description,
      price: item.price,
      imageUrl: item.image,
      // Fake Store API has no stock field - derive a deterministic value from rating count
      inStock: !item.rating || item.rating.count % 7 !== 0,
      category: item.category
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    };
  }
}
