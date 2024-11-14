import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequestDTO } from 'src/app/models/register-request.dto';
import { UserResponseDTO } from 'src/app/models/user-response.dto';
import { UserManageResponseDTO } from 'src/app/models/userManage-response.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserManageResponseDTO[]> {
    return this.http.get<UserManageResponseDTO[]>(this.url);
  }

  updateUser(id: number, user: RegisterRequestDTO): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, user);
  }

  getUser(id: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.url}/${id}`);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`);
  }
}
