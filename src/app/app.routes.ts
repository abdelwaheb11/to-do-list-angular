import { Routes } from '@angular/router';



export const routes: Routes = [
    
    {path:'tasks',loadChildren:()=>import('./modules/tasks/tasks.route')}
];
