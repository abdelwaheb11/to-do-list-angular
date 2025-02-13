import { Component, Inject, OnInit, ɵ_sanitizeHtml } from '@angular/core';
import Task from '../../../../../shared/models/task.model';
import { TaskService } from '../../../../../shared/services/task.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-tasks-details',
  imports: [
    NgIf,
    MatIconModule,
    MatButtonModule,
    NgClass,
    DatePipe
  ],
  templateUrl: './tasks-details.component.html',
  styleUrl: './tasks-details.component.css'
})
export class TasksDetailsComponent implements OnInit  {
  task : Task = new Task();

 /* _taskService = Inject(TaskService)
  _actRoute = Inject(ActivatedRoute)
  _router = Inject(Router)*/
  constructor(
    private _actRoute: ActivatedRoute,  // Injection correcte d'ActivatedRoute
    private _taskService: TaskService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._taskService.readOne(this._actRoute.snapshot.params['id']).subscribe({
      next: (task:Task) => {
        console.log('Task fetched:', task);
        this.task = task;
      },
      error: (error : any) => {
        console.error('Error:', error);
        this._router.navigate(['/tasks']);
      },
    });
  }

 
}
