import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(private router: Router) {
  }
  featuredGames = [
    {
      name: 'The Last of Us',
      image: 'https://uvejuegos.com/img/caratulas/46761/TLOU%20Francia.jpg',
      description: 'Un juego de supervivencia en un mundo post-apocalíptico',
      
    },
    {
      image: 'https://ecuadorjuegosdigitales.com/wp-content/uploads/2022/10/1643412757-god-of-war-ragnarok-ps4-pre-orden.jpg',
      name: 'God of War',
      description: 'Un juego de acción y aventura en un mundo mitológico'
    },
    // ...
  ];
  goToCatalogo() {
    // Redirigir a la página de catálogo
    this.router.navigate(['/catalogo']);
  }

  goToFormulario() {
    // Redirigir a la página de formulario
    this.router.navigate(['/videojuego-form']);
  }
}