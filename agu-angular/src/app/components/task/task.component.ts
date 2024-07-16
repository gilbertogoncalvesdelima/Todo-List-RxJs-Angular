import { Component } from '@angular/core';
import {TaskService} from "../../services/task.service";
import {FormsModule} from "@angular/forms";

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  title: string = '';
  description: string = '';

  constructor(
    private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar) {}

    addTask(): void {
      this.taskService.addTask(this.title, this.description).subscribe({
        next: () => {
          this.title = '';
          this.description = '';
          this.router.navigate(['/tasks']);
          this.snackBar.open('Tarefa criada com sucesso!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        },
        error: (err) => {
          console.error('Error adding task:', err);
          this.snackBar.open('Erro ao criar tarefa', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      });
    }
}
