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
  constructor(private authService: AuthService,
    private router: Router) {}

    ngOnInit(): void {
      this.loadUserRoles();
        this.checkAuthentication();
        this.authStatusSub = this.authService.authStatus$.subscribe(status => {
          this.isAuthenticated = status;
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
