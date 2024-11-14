import { Component } from '@angular/core';
import { UserResponseDTO } from '../models/user-response.dto';
import { UserService } from '../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/authorization/auth.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  user: UserResponseDTO | null = null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = {id: 0, username: '', password: '', names: '', surnames: '', adress: '', email: '' };
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (response) => {
          this.user = response;
        },
        (error) => {
          console.error('Error al obtener los datos del usuario', error);
        }
      );
    }
  }

  updateUser(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.user) {
      this.userService.updateUser(userId, this.user).subscribe(
        (response) => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Datos del usuario actualizados con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al actualizar los datos del usuario',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );
    }
  }

  confirmDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser();
      }
    });
  }
  
  deleteUser() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.deleteUser(userId).subscribe(
      () => {
        Swal.fire('Eliminado', 'La cuenta ha sido eliminada.', 'success');
        this.authService.logout
        this.router.navigate(['/login']);
      },
      (error) => {
        Swal.fire('Error', 'Hubo un problema al eliminar la cuenta.', 'error');
      }
    );
  }
} 
