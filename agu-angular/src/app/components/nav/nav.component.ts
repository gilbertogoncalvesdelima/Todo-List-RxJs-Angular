import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule

  ],
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  addTask(){
    this.router.navigate(['/task'])
  }

  listTasks(){
    this.router.navigate(['/tasks'])
  }
}
