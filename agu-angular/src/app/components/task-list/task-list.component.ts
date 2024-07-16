import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {NgForOf} from "@angular/common";

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

interface Task {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks: Task[] = [
    { title: 'Task 1', description: 'Description for task 1', completed: false },
    { title: 'Task 2', description: 'Description for task 2', completed: false },
    { title: 'Task 3', description: 'Description for task 3', completed: false },
    { title: 'Task 4', description: 'Description for task 4', completed: false },
    { title: 'Task 5', description: 'Description for task 5', completed: false }
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  moveToBottom(index: number) {
    const task = this.tasks.splice(index, 1)[0];
    this.tasks.push(task);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
