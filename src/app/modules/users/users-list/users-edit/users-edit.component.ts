import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersService } from '../../../../shared/services/users.service';

@Component({
  selector: 'app-users-edit',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent implements OnInit {
   elementForm: FormGroup;
      isLoading = false;
    
      constructor(private fb: FormBuilder, private userService: UsersService, private route: Router , private actRoute: ActivatedRoute) {
        this.elementForm = this.fb.group({
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
          _id : ['', Validators.required]
        });
      }
      
    ngOnInit(): void {
        this.userService.readOne(this.actRoute.snapshot.params["id"]).subscribe({
          next : (res)=>{
            console.log('User:', res);
            this.elementForm.patchValue({
              first_name: res.first_name,
              last_name: res.last_name,
              email: res.email,
              phone: res.phone,
              _id: res._id
            });
          },
          error : (error)=>{
            console.error('Error:', error);
          }
        })
    }
      
    
      onSubmit() {
        if (this.elementForm.valid) {
          this.isLoading = true;
          this.userService.editOne(this.elementForm.value).subscribe({
            next : (res)=>{
              console.log('User edited:', res);
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
