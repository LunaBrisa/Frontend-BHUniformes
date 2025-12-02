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
    { id: 1, name: 'Camiseta Premium', price: 299, emoji: '👕' },
    { id: 2, name: 'Pantalón Casual', price: 599, emoji: '👖' },
    { id: 3, name: 'Sudadera Deportiva', price: 799, emoji: '🧥' },
    { id: 4, name: 'Chamarra Elegante', price: 1299, emoji: '🧥' },
    { id: 5, name: 'Vestido Moderno', price: 899, emoji: '👗' },
    { id: 6, name: 'Shorts Verano', price: 399, emoji: '🩳' },
  ];

  quantities: any = {};
  cart: any[] = [];

  // Modal
  sizeModalOpen = false;
  currentProduct: any = null;
  selectedSize: string | null = null;

  // Notificación
  notificationVisible = false;

 constructor(private router: Router) {

  // inicializar cantidades
  this.products.forEach(p => this.quantities[p.id] = 1);
}


  // Cambiar cantidad
  changeQuantity(productId: number, delta: number) {
    this.quantities[productId] = Math.max(
      1,
      Math.min(99, this.quantities[productId] + delta)
    );
  }

  // Abrir modal de tallas
  openSizeModal(product: any) {
    this.currentProduct = product;
    this.selectedSize = null;
    this.sizeModalOpen = true;
  }

  // Seleccionar talla
  selectSize(size: string) {
    this.selectedSize = size;
  }

  // Cerrar modal
  closeModal() {
    this.sizeModalOpen = false;
  }

  // Añadir producto al carrito
  confirmAddToCart() {
    if (!this.selectedSize) {
      alert("Por favor selecciona una talla");
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
    return this.cart.reduce((s, i) => s + i.quantity, 0);
  }

  get totalPrice() {
    return this.cart.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  // Notificación animada
  showNotification() {
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 3000);
  }

  // Panel carrito
  cartPanelOpen = false;
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
    this.router.navigate(['/carga']);
  }
}
