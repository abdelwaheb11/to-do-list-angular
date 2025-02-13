import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../../../shared/services/task.service';
import Task from '../../../shared/models/task.model';
import { LoadingService } from '../../../shared/services/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {  MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from '../../../shared/components/dialog-confirm/dialog-confirm.component';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchComponent } from '../../../shared/components/search/search.component';
@Component({
  selector: 'app-tasks-list',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    RouterLink,
    DatePipe,
    RouterLink,
    FormsModule,
    UpperCasePipe,
    MatPaginatorModule,
    MatTooltipModule,
    SearchComponent
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit  {
  _taskService = inject(TaskService);
  _loadibgService = inject(LoadingService);
  _matDialog = inject(MatDialog);

  listTask: Task[] = [];
  currentPage :number = 1;
  currentSize :number = 5;
  totalPages: number = 1;
  totalSizeTasks :number =0
  searchText:string=""
  ngOnInit(): void {
    this.fetchTasks()
  }


  fetchTasks(){
    this._loadibgService.show()
      this._taskService.getList(this.currentSize.toString(),this.currentPage.toString(),this.searchText).subscribe({
        next: (res) => {
          console.log(res)  // {tasks: Array<Task>, totalPages: number, totalTasks: number}
          this.listTask = res.tasks;
          this.totalPages = res.totalPages;
          this.totalSizeTasks = res.totalTasks;
          this._loadibgService.hide()
        },
        error: (error) => {
          console.error('Error:', error) 
          this._loadibgService.hide()
        }
      })
  }

 
    


  searchTasks(searchValue: string | null | undefined) {
    if (searchValue && searchValue.trim()) { // Vérifie que la valeur n'est ni `null` ni `undefined`
      this.searchText = searchValue.trim();
    } else {
      this.searchText = ''; // Évite les erreurs en cas de valeur vide
    }
    
    this.currentPage = 1;
    this.fetchTasks();
  }
  

  deleteTask(id :string , title :string)  {
    this.openDialog("Delete Task",`Are you sure you want to delete task : ${title} ?`).afterClosed().subscribe(
      res=>{
        if(res){
          this._taskService.deleteOne(id).subscribe({
            next: (res) => {
              console.log(res)
              const index= this.listTask.findIndex(e => e._id === id);
              this.listTask.splice(index,1)
            },
            error: (error) => {
              console.error('Error:', error)
            }
          })
        }
  
      })
  }

  completedTask(id: string, title: string) {
    this.openDialog("completed Task", `Are you sure you want to mark task "${title}" as completed?`).afterClosed().subscribe(
      result => {
        if (result) {
          this._taskService.complited(id).subscribe({
            next: (res) => {
              console.log(res)
              const index= this.listTask.findIndex(e => e._id === id);
                this.listTask[index].completed=true
                this.listTask[index].completedAt=new Date()
            },
            error: (error) => {
              console.error('Error:', error)
            }
          })
        }
    });
  }

  openDialog(title: string, message: string) {
    return this._matDialog.open(DialogConfirmComponent, {
      width: "400px", 
      data: { title, message }
    });
  }


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;  
    this.currentSize = event.pageSize; 
    this.fetchTasks();
  }

  resetSearch(){
    this.searchText=""
    this.currentPage = 1;
    this.fetchTasks()
  }
  



}
