import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {TaskListComponent} from "./components/task-list/task-list.component";
import {TaskComponent} from "./components/task/task.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent,  },
  { path: 'task', component: TaskComponent,  },
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }
];
