import { RouterModule, Routes } from '@angular/router';
import { VideojuegoFormComponent } from './videojuego-form/videojuego-form.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: 'Formulario-Compra',
        component: VideojuegoFormComponent,
      },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}