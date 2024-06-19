import { RouterModule, Routes } from '@angular/router';
import { VideojuegoFormComponent } from './videojuego-form/videojuego-form.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'catalogo',
    component: CatalogoComponent,
  },
  {
    path: 'formulario',
    component: VideojuegoFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
