import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carga',
  imports: [],
  templateUrl: './carga.html',
  styleUrl: './carga.css'
})
export class Carga {
    constructor(private router: Router) {}


 ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/tienda']);
    }, 6000);
  }
}
