import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {FormsModule} from "@angular/forms";

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  title: string = '';
  description: string = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    this.taskService.addTask(this.title, this.description).subscribe(() => {
      this.title = '';
      this.description = '';
    });
  }
}
