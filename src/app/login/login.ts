import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  encapsulation: ViewEncapsulation.None
})
export class Login {
constructor(private router: Router) {}

  irAInicio() {
    this.router.navigate(['inicio']);
  }

  irARegistro() {
    this.router.navigate(['registro']);
  }
}
