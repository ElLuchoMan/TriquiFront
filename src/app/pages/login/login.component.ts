import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistroService } from '../services/registro.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup = this.fb.group({
    correo: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]],
  })
  constructor(private fb: FormBuilder, private router: Router, private registroService: RegistroService, private toastr: ToastrService, private validatorService: ValidatorService) { }

  ngOnInit(): void {
  }
  get emailErrorMsg(): string {
    const errors = this.login.get('correo')?.errors;
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
    return this.login.get(campo)?.invalid && this.login.get(campo)?.touched;
  }
  iniciarSesion() {
    const { correo, password } = this.login.value;
    this.router.navigateByUrl('/juego');
    this.registroService.login(correo, password).subscribe(ok => {
      if (ok) {
        this.router.navigateByUrl('/triqui');
      } else {
        this.toastr.error('No se pudo iniciar sesión', '¡Error!');
      }
    });


  }

}
