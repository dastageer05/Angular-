import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CoursesComponent } from '../courses/courses.component';
import { AboutComponent } from '../about/about.component';
// import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
// import { Strings } from '../enum/strings.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CoursesComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

// private router = inject(Router);
  // val: number = 2;
  // courses: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // this.getCourses();
    }
  }

  // getCourses() {
  //   const data = localStorage.getItem(Strings.STORAGE_KEY);
  //   if (data) {
  //     this.courses = JSON.parse(data);
  //   }
  // }

}
