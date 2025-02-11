import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-navbar',
  imports: [
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  _loadingService = inject(LoadingService)
  

}
