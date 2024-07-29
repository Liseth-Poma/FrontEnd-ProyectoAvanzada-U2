import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RegistroService } from '../services/registro.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { FormBuilder } from '@angular/forms';
import { CargaritemsService } from '../services/cargaritems.service';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NavbarComponent,
    HttpClientModule,
  ],
  providers: [
    FormBuilder,
    NavbarComponent,
    RegistroService,
    CargaritemsService,
  ],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css',
})
export class ListarClientesComponent {
  clientes: any[] = [];

  constructor(private registroService: RegistroService) {}

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.registroService.getAllFormularios().subscribe(
      (data) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }
}
