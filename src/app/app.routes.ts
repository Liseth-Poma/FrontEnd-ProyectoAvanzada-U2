import { RouterModule, Routes } from '@angular/router';
import { VideojuegoFormComponent } from './videojuego-form/videojuego-form.component';
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';

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
    path: 'videojuego-form',
    component: VideojuegoFormComponent,
  },
  {
    path: 'ListarClientes',
    component: ListarClientesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
