import {  Routes } from "@angular/router";
import { UsersListComponent } from "./users-list/users-list.component";
import { UsersAddComponent } from "./users-add/users-add.component";
import { UsersDetailComponent } from "./users-list/users-detail/users-detail.component";
import { UsersEditComponent } from "./users-list/users-edit/users-edit.component";


export default [
    {path:'', component:UsersListComponent},
    {path:'add',component:UsersAddComponent},
    {path:':id',children:[
        {path:'',component:UsersDetailComponent},
        {path:'edit',component:UsersEditComponent},
        
    ]}

] as Routes