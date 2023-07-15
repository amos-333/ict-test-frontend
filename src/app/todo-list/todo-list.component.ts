import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  newTodoDescription: string;
  todos: any[];
  filteredTodos: any[];

  constructor(private todoService: TodoService) {
    this.newTodoDescription = '';
    this.todos = [];
    this.filteredTodos = [];
  }

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe(
      (data) => {
        this.todos = data;
        this.filterTodos('all');
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  addTodo() {
    if (this.newTodoDescription.trim() !== '') {
      const newTodo = {
        description: this.newTodoDescription,
        completed: false
      };
      this.todoService.addTodo(newTodo).subscribe(
        (data) => {
          this.newTodoDescription = '';
          this.fetchTodos();
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      );
    }
  }

  updateTodoStatus(todo: any) {
    this.todoService.updateTodoStatus(todo._id, todo.completed).subscribe(
      (data) => {
        this.fetchTodos();
      },
      (error) => {  
        console.error('Error updating todo status:', error);
      }
    );
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe(
      (data) => {
        this.fetchTodos();
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  filterTodos(filter: string) {
    switch (filter) {
      case 'all':
        this.filteredTodos = this.todos;
        break;
      case 'completed':
        this.filteredTodos = this.todos.filter(todo => todo.completed);
        break;
      case 'incomplete':
        this.filteredTodos = this.todos.filter(todo => !todo.completed);
        break;
    }
  }
}