import { Component, Inject, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-tasks-add',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
  ],
  templateUrl: './tasks-add.component.html',
  styleUrl: './tasks-add.component.css'
})
export class TasksAddComponent  {
  elementForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private rout: Router) {
    this.elementForm = this.fb.group({
      title: ['', Validators.required],
      desc: [''],
      completed: [false],
    });
  }

  

  onSubmit() {
    if (this.elementForm.valid) {
      this.isLoading = true;
      this.taskService.addNewOne(this.elementForm.value).subscribe({
        next : (res)=>{
          console.log('Task added:', res);
          this.elementForm.reset();
          this.isLoading = false;
          this.rout.navigate(['/tasks']);
        },
        error : (error)=>{
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
