import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { CartState } from '../../store/cart/cart.reducer';
import { addToCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card', 
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  constructor(private store: Store<{ cart: CartState }>) {}

  onAddToCart(): void {
    this.store.select(state => state.cart.items).pipe(take(1)).subscribe(items => {
      const alreadyInCart = items.some(item => item.product.id === this.product.id);
      if (alreadyInCart) {
        Swal.fire('Увага!', 'Цей товар уже додано до кошика.', 'info');
        return;
      }

      this.store.dispatch(addToCart({ product: this.product }));

      Swal.fire('✅ Товар додано!', `"${this.product.name}" успішно додано до кошика.`, 'success');
    });
  }
}
