import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  games = [
    {
      name: 'The Last of Us',
      description: 'Un juego de supervivencia en un mundo post-apocalíptico',
      image: 'https://example.com/tlou.jpg'
    },
    {
      name: 'God of War',
      description: 'Un juego de acción y aventuras en un mundo mitológico',
      image: 'https://example.com/gow.jpg'
    },
    {
      name: 'Horizon Zero Dawn',
      description: 'Un juego de acción y aventuras en un mundo post-apocalíptico',
      image: 'https://example.com/hzd.jpg'
    },
    // ...
  ];
}