import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://6696d0a00312447373c3ca18.mockapi.io/tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(tasks => console.log('Fetched tasks', tasks)),
      catchError(this.handleError)
    );
  }

  getTask(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(task => console.log(`Fetched task id=${id}`, task)),
      catchError(this.handleError)
    );
  }

  addTask(title: string, description: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { title, description }).pipe(
      tap(newTask => console.log('Added task', newTask)),
      catchError(this.handleError)
    );
  }

  updateTask(id: string, task: { title: string, description: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, task).pipe(
      tap(updatedTask => console.log(`Updated task id=${id}`, updatedTask)),
      catchError(this.handleError)
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Deleted task id=${id}`)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro de client-side ou rede
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Erro de back-end
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
