import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Registro } from 'src/app/interfaces/registro.interface';
import { RegistroService } from '../services/registro.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registro: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    tipoDocumento: ['', Validators.required],
    documento: ['', Validators.required],
    password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
    correo: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],

  })
  constructor(private fb: FormBuilder, private validatorService: ValidatorService, private registroService: RegistroService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }
  get emailErrorMsg(): string {
    const errors = this.registro.get('correo')?.errors;
    if (errors?.required) {
      return 'El correo es obligatorio';
    } else if (errors?.pattern) {
      return 'El valor ingresado no tiene formato de correo';
    } else if (errors?.emailTomado) {
      return 'El correo ya está resgistrado';
    }
    return ''
  }
  campoNoValido(campo: string) {
    return this.registro.get(campo)?.invalid && this.registro.get(campo)?.touched;
  }
  registrar() {
    const registro: Registro = {
      nombre: this.registro.get('nombre')?.value,
      apellido: this.registro.get('apellido')?.value,
      tipoDocumento: this.registro.get('tipoDocumento')?.value,
      documento: this.registro.get('documento')?.value,
      correo: this.registro.get('correo')?.value,
      password: this.registro.get('password')?.value,

    }
    this.registroService.setRegistro(registro).subscribe(data => {
      console.log(data);
      this.toastr.success('La información ya se almacenó en la base de datos.', '¡Registro creado!');
      this.registro.reset();
      this.router.navigate(['./login'])
    }, error => {
      console.log(error);
      this.toastr.error('Se presentó un error, verifique la información o la conexión.', 'Error');
    });
  }

}
