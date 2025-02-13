import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TaskService } from '../../../../../shared/services/task.service';

@Component({
  selector: 'app-tasks-edit',
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
  templateUrl: './tasks-edit.component.html',
  styleUrl: './tasks-edit.component.css',
})
export class TasksEditComponent implements OnInit {
  elementForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private rout: Router,
    private actRout: ActivatedRoute
  ) {
    this.elementForm = this.fb.group({
      title: ['', Validators.required],
      desc: [''],
      completed: [false],
      _id:['', Validators.required]
    });
  }

  onSubmit() {
    if (this.elementForm.valid) {
          this.isLoading = true;
          this.taskService.editOne(this.elementForm.value).subscribe({
            next : (res)=>{
              console.log('Task updated:', res);
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

  ngOnInit(): void {
    this.taskService.readOne(this.actRout.snapshot.params['id']).subscribe({
      next: (task) => {
        console.log('Task fetched:', task);
        this.elementForm.patchValue(task);
      },
      error: (error) => {
        console.error('Error:', error);
        this.rout.navigate(['/tasks']);
      },
    });
  }
}
