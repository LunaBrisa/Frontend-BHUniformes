import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css'],
  encapsulation: ViewEncapsulation.None
})
export class Registro {
 constructor(private router: Router) {}

  irALogin() {
    this.router.navigate(['login']);
  }
}
