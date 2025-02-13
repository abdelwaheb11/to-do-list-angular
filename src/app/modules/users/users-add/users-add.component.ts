import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../shared/services/users.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-add',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-add.component.html',
  styleUrl: './users-add.component.css'
})
export class UsersAddComponent {
  elementForm: FormGroup;
    isLoading = false;
  
    constructor(private fb: FormBuilder, private userService: UsersService, private route: Router) {
      this.elementForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
      });
    }
    
  
    
  
    onSubmit() {
      if (this.elementForm.valid) {
        this.isLoading = true;
        this.userService.addNewOne(this.elementForm.value).subscribe({
          next : (res)=>{
            console.log('User added:', res);
            this.elementForm.reset();
            this.isLoading = false;
            this.route.navigate(['/users']);
          },
          error : (error)=>{
            console.error('Error:', error);
            this.isLoading = false;
          }
        });
      }
    }
}
