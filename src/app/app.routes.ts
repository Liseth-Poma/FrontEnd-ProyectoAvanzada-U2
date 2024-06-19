import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
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
=======
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { FormularioComponent } from './formulario/formulario.component';

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
    component: FormularioComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
>>>>>>> 555da875ccfc18bca1cdf97877081567dda36a01
