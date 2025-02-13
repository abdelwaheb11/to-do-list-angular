import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';
import User from '../../../../shared/models/users.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users-detail',
  imports: [
    MatIconModule
  ],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.css'
})
export class UsersDetailComponent implements OnInit {
  user : User = new User()
   constructor(
      private _actRoute: ActivatedRoute, 
      private _userService: UsersService,
      private _router: Router
    ) {}
  ngOnInit(): void {
      this._userService.readOne(this._actRoute.snapshot.params['id']).subscribe({
        next: (user:User) => {
          console.log('Task fetched:', user);
          this.user = user;
        },
        error: (error : any) => {
          console.error('Error:', error);
          this._router.navigate(['/tasks']);
        },
      });
    }
}
