import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tienda',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.html',
  styleUrls: ['./tienda.css'],
  encapsulation: ViewEncapsulation.None
})
export class Tienda {

  products = [
  { id: 1, name: 'Camiseta Premium', price: 299, image: 'assets/img/f1.png' },
  { id: 2, name: 'Pantalón Casual', price: 599, image: 'assets/img/f2.png' },
  { id: 3, name: 'Sudadera Deportiva', price: 799, image: 'assets/img/f3.png' },
  { id: 4, name: 'Chamarra Elegante', price: 1299, image: 'assets/img/f4.png' },
  { id: 5, name: 'Vestido Moderno', price: 899, image: 'assets/img/f5.png' },
  { id: 6, name: 'Shorts Verano', price: 399, image: 'assets/img/f6.png' },
];


  quantities: any = {};
  cart: any[] = [];

  sizeModalOpen = false;
  currentProduct: any = null;
  selectedSize: string | null = null;

  notificationVisible = false;
  cartPanelOpen = false;

  constructor(private router: Router) {
    this.products.forEach(p => this.quantities[p.id] = 1);
  }

  changeQuantity(productId: number, delta: number) {
    this.quantities[productId] = Math.max(1, this.quantities[productId] + delta);
  }

  openSizeModal(product: any) {
    this.currentProduct = product;
    this.selectedSize = null;
    this.sizeModalOpen = true;
  }

  selectSize(size: string) {
    this.selectedSize = size;
  }

  closeModal() {
    this.sizeModalOpen = false;
  }

  confirmAddToCart() {
    if (!this.selectedSize) {
      alert('Selecciona una talla');
      return;
    }

    const quantity = this.quantities[this.currentProduct.id];

    this.cart.push({
      ...this.currentProduct,
      size: this.selectedSize,
      quantity,
    });

    this.showNotification();
    this.closeModal();
  }

  get cartCount() {
    return this.cart.reduce((a, b) => a + b.quantity, 0);
  }

  get totalPrice() {
    return this.cart.reduce((a, b) => a + b.quantity * b.price, 0);
  }

  removeFromCart(i: number) {
    this.cart.splice(i, 1);
  }

  showNotification() {
    this.notificationVisible = true;
    setTimeout(() => this.notificationVisible = false, 2000);
  }

  toggleCart() {
    this.cartPanelOpen = !this.cartPanelOpen;
  }

  irAGaleria() {
    this.router.navigate(['/catalogo']);
  }

  irAInicio() {
    this.router.navigate(['/inicio']);
  }

  irAContacto() {
    this.router.navigate(['/comentario']);
  }

  irATienda() {
    this.router.navigate(['/tienda']);  // ← CORREGIDO
  }
}
