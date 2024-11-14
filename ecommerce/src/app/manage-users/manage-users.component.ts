import { Component, OnInit } from '@angular/core';
import { UserManageResponseDTO } from '../models/userManage-response.dto';
import { UserService } from '../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: UserManageResponseDTO[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => this.users = users,
      (error) => console.error('Error loading users:', error)
    );
  }

  deleteUser(userId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(userId).subscribe(
          () => {
            this.users = this.users.filter(user => user.id !== userId);
            Swal.fire(
              'Eliminado',
              'El usuario ha sido eliminado correctamente',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire(
              'Error',
              'Hubo un problema al eliminar el usuario',
              'error'
            );
          }
        );
      }
    });
  }
}