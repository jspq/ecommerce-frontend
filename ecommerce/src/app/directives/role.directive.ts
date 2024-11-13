import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/authorization/auth.service';

@Directive({
    selector: '[appRole]'
})
export class RoleDirective implements OnInit {
    @Input() appRole: string | undefined;

    constructor(private el: ElementRef, private renderer: Renderer2, private authService: AuthService) { }

    ngOnInit() {
        const role = this.authService.getRole();
        if (role !== this.appRole) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
    }
}