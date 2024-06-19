import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
    selector: 'app-videojuego-form',
    standalone: true,
    providers: [FormBuilder, NavbarComponent],
    templateUrl: './videojuego-form.component.html',
    styleUrl: './videojuego-form.component.css',
    imports: [ReactiveFormsModule, FormsModule, CommonModule, RecaptchaModule, RecaptchaFormsModule, NavbarComponent]
})
export class VideojuegoFormComponent implements OnInit{

  form: FormGroup;
  precios: { [key: string]: number } = {
    'Resident Evil 4': 50,
    'The Last of Us': 60,
    'Minecraft': 70,
    'Soulmask': 80,
    'Mario Kart 8': 90,
    'Resident Evil 2': 50,
    'The Last of Us 1': 60,
    'Minecraft t': 70,
    'Soulmask 4': 80,
    'Mario Kart 8 2': 90
  };
  captchaValid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Z]{3,15}$')]],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@gmail\\.com$'), Validators.minLength(10), Validators.maxLength(50)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      videojuego: ['', Validators.required],
      precio: [{ value: '', disabled: true }, Validators.required],
      codigo: [''],
      subtotal: [{ value: '', disabled: true }, Validators.required],
      total: [{ value: '', disabled: true }, Validators.required],

    });
  }

  ngOnInit(): void {
    this.form.get('videojuego')?.valueChanges.subscribe(value => {
      if (value) {
        const precio = this.precios[value];
        this.form.get('precio')?.setValue(precio);
        this.actualizarTotal();
      }
    });

    this.form.get('codigo')?.valueChanges.subscribe(() => {
      this.actualizarTotal();
    });
  }

  actualizarTotal(): void {
    const precio = this.form.get('precio')?.value;
    let subtotal = precio;
    const codigo = this.form.get('codigo')?.value;

    if (codigo && codigo !== 'Avanzada') {
      this.form.get('codigo')?.setErrors({ invalidCode: true });
    } else {
      if (codigo === 'Avanzada') {
        subtotal *= 0.9; // 10% de descuento
        this.form.get('codigo')?.setErrors(null); // Eliminar errores si el código es válido
      }
      this.form.get('subtotal')?.setValue(subtotal);
      this.form.get('total')?.setValue(subtotal);
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
      Swal.fire('Formulario enviado', 'Revise su correo', 'success');
      this.form.reset();
      // Mantener los campos deshabilitados después del reset
      this.form.get('precio')?.disable();
      this.form.get('subtotal')?.disable();
      this.form.get('total')?.disable();

    } else {
      this.form.markAllAsTouched();
    }
  }
}
