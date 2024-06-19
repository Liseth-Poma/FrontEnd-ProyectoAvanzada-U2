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
      image: 'https://uvejuegos.com/img/caratulas/46761/TLOU%20Francia.jpg'
    },
    {
      name: 'God of War',
      description: 'Un juego de acción y aventuras en un mundo mitológico',
      image: 'https://ecuadorjuegosdigitales.com/wp-content/uploads/2022/10/1643412757-god-of-war-ragnarok-ps4-pre-orden.jpg'
    },
    {
      name: 'Horizon Zero Dawn',
      description: 'Un juego de acción y aventuras en un mundo post-apocalíptico',
      image: 'https://cdn1.epicgames.com/3328b08ac1c14540aa265a1a85c07839/offer/hzd_tall-1200x1600-d4b1057afd47f9256d8da71f2f187be4.jpg'
    },
    // ...
  ];
}
