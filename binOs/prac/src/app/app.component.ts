import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'prac';

  students = [
    { name: 'Dastagir', age: 20 },
    { name: 'Ranjeet', age: 22 },
    { name: 'Abhijeet', age: 21 },
    { name: 'Yash', age: 23 },
  ];
}
