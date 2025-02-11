import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import Task from '../../../shared/models/task.model';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-tasks-list',
  imports: [],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit  {
  _taskService = inject(TaskService);
  _loadibgService = inject(LoadingService);
  listTask: Task[] = [];
  currentPage :number = 1;
  currentSize :number = 10;
  searchText:string=""
  ngOnInit(): void {
    this._loadibgService.show()
      this._taskService.getList(this.currentSize.toString(),this.currentPage.toString(),this.searchText).subscribe({
        next: (tasks) => {
          this.listTask = tasks;
          this._loadibgService.hide()
        },
        error: (error) => {
          console.error('Error:', error) 
          this._loadibgService.hide()
        }
      })
  }
}
