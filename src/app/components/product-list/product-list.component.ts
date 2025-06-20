import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  filters = {
    category: 'All',
    sortBy: 'priceAsc',
    minPrice: 0,
    maxPrice: 20,
    minRating: 0,
  };

  constructor(private productsService: ProductsService, private store: Store) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.applyFilters();
    });
  }

  onFiltersChanged(filters: any) {
    this.filters = filters;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      if (this.filters.category !== 'All' && product.category !== this.filters.category) {
        return false;
      }
      if (product.price < this.filters.minPrice || product.price > this.filters.maxPrice) {
        return false;
      }
      if (product.rating < this.filters.minRating) {
        return false;
      }
      return true;
    });

    switch (this.filters.sortBy) {
      case 'priceAsc':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'ratingDesc':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
  }

  onAddToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
