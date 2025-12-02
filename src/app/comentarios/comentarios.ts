import { Component, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comentarios',
  imports: [],
  templateUrl: './comentarios.html',
   styleUrls: ['./comentarios.css'],
  encapsulation: ViewEncapsulation.None
})
export class Comentarios {
 constructor(private router: Router) {}

  irARegistro() {
    this.router.navigate(['registro']);
  }
  irATienda() {
    this.router.navigate(['/carga']);
  }
}
