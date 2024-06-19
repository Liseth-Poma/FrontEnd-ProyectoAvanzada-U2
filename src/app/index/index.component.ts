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
      image: 'https://example.com/game1.jpg',
      name: 'The Last of Us',
      description: 'Un juego de supervivencia en un mundo post-apocalíptico'
    },
    {
      image: 'https://example.com/game2.jpg',
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