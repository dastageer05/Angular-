import { Component } from '@angular/core';
import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title="NGM"
  private http = inject(HttpClient);

  ngOnInit() {
    console.log('home ngoninit');
    // this.getCourses();

    this.fetchHttpData();
  }

  async fetchHttpData() {

    try {
      const posts = await lastValueFrom(
        this.http.get<any>('https://jsonplaceholder.typicode.com/posts')
      );
  
      console.log('posts: ', posts);
    } catch(e) {
      console.log(e);
    }
  }

}
