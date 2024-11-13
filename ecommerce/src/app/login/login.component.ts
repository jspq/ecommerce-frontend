import { Component } from '@angular/core';
import { AuthService } from '../services/authorization/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if(this.loginData.username && this.loginData.password) {
      this.login()
    } else {
      console.log('Diligencia los campos')
    }
  }

  login(): void {
    this.authService.login(this.loginData.username, this.loginData.password).subscribe(
      respose => {
        this.router.navigate(['/home'])
      }
    )
  }
}
