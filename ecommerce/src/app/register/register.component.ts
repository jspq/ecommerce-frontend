import { Component } from '@angular/core';
import { AuthService } from '../services/authorization/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
    username: '',
    password: '',
    names: '',
    surnames: '',
    adress: '',
    email: ''
  };
  
  constructor(private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.invalid) {
      return;
    }

    this.authService.registerUser(this.registerData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Usuario registrado!',
          text: 'Tu cuenta ha sido creada exitosamente.',
          confirmButtonText: 'Iniciar Sesión'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar el usuario. Intenta nuevamente.',
        });
      }
    );
  }
  
}
