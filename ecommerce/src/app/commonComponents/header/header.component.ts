import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authorization/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  private authStatusSub: Subscription | undefined;
  userRoles: string[] = [];
  userId: number = 0;
  isLoginRoute: boolean = false;
  constructor(private authService: AuthService,
    private router: Router) {}

    ngOnInit(): void {
      this.loadUserRoles();
      this.checkAuthentication();
      this.authStatusSub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
      this.userId = this.authService.getUserId() ?? 0;
      console.log(this.authService.getUserId());
      });
      this.router.events.subscribe(() => {
        this.isLoginRoute = this.router.url === '/login';
      });
    }

    ngOnDestroy(): void {
      if (this.authStatusSub) {
        this.authStatusSub.unsubscribe();
      }
    }

    onLogout(): void {
      console.log('click');
      this.authService.logout();
      this.router.navigate(['/login']);
    }

    checkAuthentication(): void {
      this.isAuthenticated = this.authService.isAuthenticated();
    }

    loadUserRoles(): void {
      const roles = localStorage.getItem('role');
      if (roles) {
        this.userRoles = JSON.parse(roles);
      }
    }
}
