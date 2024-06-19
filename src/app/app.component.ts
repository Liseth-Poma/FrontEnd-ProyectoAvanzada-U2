import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VideojuegoFormComponent } from './videojuego-form/videojuego-form.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CatalogoComponent, CommonModule, VideojuegoFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Formulario_VideoJuegos';
}
