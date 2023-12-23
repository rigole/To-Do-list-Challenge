import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskupdateComponent } from './taskupdate/taskupdate.component';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [

 
  { path: '', redirectTo: 'task', pathMatch: 'full' },
  { path: 'task', component:  TaskListComponent},
  { path: 'task/:id', component: TaskupdateComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
