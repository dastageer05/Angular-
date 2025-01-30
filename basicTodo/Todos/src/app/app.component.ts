import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Todos';
  myTodos: any[] = [];
  newTodo = '';
  editTodoStatus = false;
  editTodoId = '';

  private serverUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.http.get<any[]>(`${this.serverUrl}/gettodo`).subscribe((data) => {
      this.myTodos = data;
    });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.http
        .post(`${this.serverUrl}/addtodo`, { todo: this.newTodo })
        .subscribe((data) => {
          this.getTodos();
          this.newTodo = '';
        });
    }
  }

  editTodo(id: string) {
    this.newTodo = this.myTodos.find((id) => id === id).todo;
    this.editTodoStatus = true;
    this.editTodoId = id;
  }

  updateTodo() {
    this.http
      .put(`${this.serverUrl}/edittodo`, {
        id: this.editTodoId,
        todo: this.newTodo,
      })
      .subscribe(() => {
        this.getTodos();
        this.editTodoStatus = false;
      });
  }

  deleteTodo(id: string) {
    this.http
      .delete(`${this.serverUrl}/deletetodo`, { body: { id } })
      .subscribe(() => {
        this.getTodos();
      });
  }

  cancelEdit() {
    this.newTodo = '';
    this.editTodoStatus = false;
  }
}
