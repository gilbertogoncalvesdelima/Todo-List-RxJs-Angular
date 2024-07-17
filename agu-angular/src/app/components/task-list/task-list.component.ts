import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Task {
  id: string;
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
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

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

  deleteTask(id: string, index: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks.splice(index, 1);
        this.snackBar.open('Tarefa deletada com sucesso!', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      },
      error: (err) => {
        this.snackBar.open('Erro ao deletar tarefa', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    });
  }

  editTask(task: Task): void {
    this.router.navigate(['/task', task.id]);
  }
}
