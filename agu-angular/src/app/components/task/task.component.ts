import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  taskForm!: FormGroup;
  tasks: any[] = [];
  editMode: boolean = false;
  editTaskId: string | null = null;
  feedbackMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.editTaskId = taskId;
        this.loadTask(taskId);
      }
    });
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadTask(id: string): void {
    this.taskService.getTask(id).subscribe(task => {
      this.taskForm.patchValue({
        title: task.title,
        description: task.description
      });
      this.editMode = true;
    });
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const { title, description } = this.taskForm.value;

      if (this.editMode) {
        // Atualizar tarefa existente
        this.taskService.updateTask(this.editTaskId!, { title, description }).subscribe({
          next: () => {
            this.feedbackMessage = 'Tarefa atualizada com sucesso!';
            console.log('Task updated successfully'); // Log de depuração
            setTimeout(() => this.router.navigate(['/tasks']), 3000);
          },
          error: (err) => {
            console.error('Error updating task:', err);
            this.feedbackMessage = 'Erro ao atualizar tarefa';
          }
        });
      } else {
        // Adicionar nova tarefa
        this.taskService.addTask(title, description).subscribe({
          next: () => {
            this.taskForm.reset();
            this.feedbackMessage = 'Tarefa criada com sucesso!';
            console.log('Task added successfully'); // Log de depuração
            setTimeout(() => this.router.navigate(['/tasks']), 3000);
          },
          error: (err) => {
            console.error('Error adding task:', err);
            this.feedbackMessage = 'Erro ao criar tarefa';
          }
        });
      }
    }
  }
}
