import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addTodo(todo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, todo);
  }

  updateTodoStatus(todoId: string, completed: boolean): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.put<any>(url, { completed });
  }

  deleteTodo(todoId: string): Observable<any> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<any>(url);
  }
}