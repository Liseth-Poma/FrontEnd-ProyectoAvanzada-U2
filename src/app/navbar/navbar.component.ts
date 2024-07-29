import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  goToIndex() {
    this.router.navigate(['/', 'index']);
  }
  goToCatalogo() {
    this.router.navigate(['/', 'catalogo']);
  }
  goToFormulario() {
    this.router.navigate(['/', 'videojuego-form']);
  }
  goToClientes() {
    this.router.navigate(['/', 'ListarClientes']);
  }
}
