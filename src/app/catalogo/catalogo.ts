
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

  inicio() {
    this.router.navigate(['/inicio']);
  }

    galeria() {
    this.router.navigate(['/catalogo']);
  }
}
