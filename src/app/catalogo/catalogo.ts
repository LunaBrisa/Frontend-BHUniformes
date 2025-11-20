
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalogo',
  imports: [],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
  encapsulation: ViewEncapsulation.None
})
export class Catalogo {

 constructor(private router: Router) {}

  irAinicio() {
    this.router.navigate(['/inicio']);
  }

    irAgaleria() {
    this.router.navigate(['/catalogo']);
  }

  irAContacto() {
    this.router.navigate(['/comentario']);
  }
}
