import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { RegistroService } from '../services/registro.service';
import { CargaritemsService } from '../services/cargaritems.service';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-videojuego-form',
  standalone: true,
  providers: [FormBuilder, NavbarComponent, RegistroService, CargaritemsService],
  templateUrl: './videojuego-form.component.html',
  styleUrls: ['./videojuego-form.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule, NavbarComponent, HttpClientModule]
})
export class VideojuegoFormComponent implements OnInit {
  form: FormGroup;
  precios: { [key: string]: number } = {};
  captchaValid: boolean = false;
  videojuegos: any[] = [];
  descuentoActual: any = null; // Variable para almacenar el descuento actual

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private cargaritemsService: CargaritemsService
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-zÁÉÍÓÚÑáéíóúñ\\s]{3,50}$')]],
      email: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      cedula: ['', [Validators.required, this.validateEcuadorianCedula]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      videojuego: ['', Validators.required],
      idVideojuego: [''], // Campo oculto para el ID del videojuego
      precio: [{ value: '', disabled: true }, Validators.required],
      codigoDescuento: [''],
      subtotal: [{ value: '', disabled: true }, Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],
      captcha: ['']
    });
  }

  ngOnInit(): void {
    // Obtener videojuegos desde el servicio
    this.cargaritemsService.getAllVideojuegos().subscribe(data => {
      this.videojuegos = data;
      this.precios = data.reduce((acc: any, videojuego: any) => {
        acc[videojuego.nombre] = videojuego.precio;
        return acc;
      }, {});
    });

    this.form.get('videojuego')?.valueChanges.subscribe(value => {
      if (value) {
        const selectedVideojuego = this.videojuegos.find(v => v.nombre === value);
        const precio = selectedVideojuego ? selectedVideojuego.precio : 0;
        this.form.get('precio')?.setValue(precio);
        this.form.get('idVideojuego')?.setValue(selectedVideojuego ? selectedVideojuego._id : ''); // Guardar el ID del videojuego
        this.actualizarTotal(); // Llamar a actualizarTotal al cambiar el videojuego
      }
    });

    this.form.get('codigoDescuento')?.valueChanges.pipe(
      debounceTime(2000), // Retraso de 1000 ms
      distinctUntilChanged(), // Emitir solo si el valor ha cambiado
      switchMap(codigoDescuento => {
        if (codigoDescuento) {
          return this.cargaritemsService.getDescuentoByCodigo(codigoDescuento);
        } else {
          return of(null); // Retornar null si no hay código
        }
      })
    ).subscribe(descuento => {
      this.descuentoActual = descuento; // Guardar el descuento actual
      this.actualizarTotal(); // Actualizar total y subtotal
    }, err => {
      this.descuentoActual = null; // Limpiar el descuento actual en caso de error
      this.actualizarTotal(); // Actualizar total y subtotal
    });
  }

  actualizarTotal(): void {
    const precio = this.form.get('precio')?.value;
    let subtotal = precio;

    if (this.descuentoActual) {
      subtotal *= (1 - this.descuentoActual.porcentaje / 100);
      this.form.get('codigoDescuento')?.setErrors(null); // Eliminar errores si el código es válido
    } else if (this.form.get('codigoDescuento')?.value) {
      this.form.get('codigoDescuento')?.setErrors({ invalidCode: true });
    }

    this.form.get('subtotal')?.setValue(subtotal);
    this.form.get('total')?.setValue(subtotal);
  }

  validateEcuadorianCedula(control: AbstractControl): ValidationErrors | null {
    const cedula = control.value;
    if (!cedula) {
      return null;
    }

    if (cedula.length !== 10) {
      return { invalidCedula: true };
    }

    const digito_region = cedula.substring(0, 2);
    if (digito_region < 1 || digito_region > 24) {
      return { invalidCedula: true };
    }

    const ultimo_digito = parseInt(cedula.substring(9, 10));
    const pares = parseInt(cedula.substring(1, 2)) +
                  parseInt(cedula.substring(3, 4)) +
                  parseInt(cedula.substring(5, 6)) +
                  parseInt(cedula.substring(7, 8));

    const getImparesSum = (cedula: string) => {
      let sum = 0;
      for (let i = 0; i < 9; i += 2) {
        let num = parseInt(cedula.charAt(i)) * 2;
        sum += num > 9 ? num - 9 : num;
      }
      return sum;
    };

    const impares = getImparesSum(cedula);
    const suma_total = pares + impares;
    const primer_digito_suma = parseInt(String(suma_total).substring(0, 1));
    const decena = (primer_digito_suma + 1) * 10;
    const digito_validador = decena - suma_total === 10 ? 0 : decena - suma_total;

    if (digito_validador === ultimo_digito) {
      return null;
    } else {
      return { invalidCedula: true };
    }
  }

  resolved(captchaResponse: string | null) {
    this.captchaValid = captchaResponse !== null && captchaResponse.length > 0;
    if (this.captchaValid) {
      this.form.get('captcha')?.setValue(captchaResponse);
    } else {
      this.form.get('captcha')?.setValue(null);
    }
  }

  onSubmit(): void {
    if (this.form.valid && this.captchaValid) {
      // Habilitar temporalmente los campos deshabilitados
      this.form.get('precio')?.enable();
      this.form.get('subtotal')?.enable();
      this.form.get('total')?.enable();

      const formData = { ...this.form.value };

      // Asegurarse de que el ID del videojuego y el código de descuento se envíen correctamente
      formData.idVideojuego = this.form.get('idVideojuego')?.value;
      formData.codigoDescuento = this.form.get('codigoDescuento')?.value || null;

      console.log("Datos Formulario", formData); // Verifica que los datos estén completos

      this.registroService.createFormulario(formData).subscribe(() => {
        Swal.fire('Formulario enviado', 'Revise su correo', 'success');
        this.form.reset();
        // Mantener los campos deshabilitados después del reset
        this.form.get('precio')?.disable();
        this.form.get('subtotal')?.disable();
        this.form.get('total')?.disable();
      }, err => {
        Swal.fire('Error', 'No se pudo enviar el formulario', 'error');
      }, () => {
        // Deshabilitar los campos nuevamente después de la solicitud
        this.form.get('precio')?.disable();
        this.form.get('subtotal')?.disable();
        this.form.get('total')?.disable();
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
