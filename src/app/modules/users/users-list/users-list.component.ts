import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import User, { UsersPagination } from '../../../shared/models/users.model';
import { DialogConfirmComponent } from '../../../shared/components/dialog-confirm/dialog-confirm.component';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UsersService } from '../../../shared/services/users.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', '_id'];
  usersList: User[] = [];
  dataSource = new MatTableDataSource<User>(this.usersList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  _userService = inject(UsersService);
  _loadingService = inject(LoadingService);
  _matDialog = inject(MatDialog);

  currentPage: number = 1;
  currentSize: number = 5;
  totalPages: number = 1;
  totalSizeUsers: number = 0;
  searchText: string = "";

  ngOnInit(): void {
    this.fetchUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  fetchUsers(): void {
    this._loadingService.show();
    this._userService.getList(this.currentSize.toString(), this.currentPage.toString(), this.searchText).subscribe({
      next: (res) => {
        console.log(res);
        this.usersList = res.users;
        this.dataSource.data = this.usersList;
        this.totalPages = res.totalPages;
        this.totalSizeUsers = res.totalUsers;
        this._loadingService.hide();
      },
      error: (error) => {
        console.error('Error:', error);
        this._loadingService.hide();
      }
    });
  }

  searchUsers(): void {
    if (this.searchText.trim()) {
      this.currentPage = 1;
      this.fetchUsers();
    }
  }

  deleteUser(id: string): void {
    this.openDialog("Delete User", `Are you sure you want to delete User?`).afterClosed().subscribe(
      (res) => {
        if (res) {
          this._userService.deleteOne(id).subscribe({
            next: (res) => {
              console.log(res);
              const index = this.usersList.findIndex(e => e._id === id);
              this.usersList.splice(index, 1);
              this.dataSource.data = this.usersList;
            },
            error: (error) => {
              console.error('Error:', error);
            }
          });
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
    this.fetchUsers();
  }
}
