import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { VideojuegoFormComponent } from './videojuego-form/videojuego-form.component';
=======
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CommonModule } from '@angular/common';
>>>>>>> 555da875ccfc18bca1cdf97877081567dda36a01

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, VideojuegoFormComponent],
=======
  imports: [RouterOutlet, CatalogoComponent, CommonModule],
>>>>>>> 555da875ccfc18bca1cdf97877081567dda36a01
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Formulario_VideoJuegos';
}
