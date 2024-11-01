import { Component } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  isAdmin = input<boolean>(false);
  courseService = inject(CourseService);

  a = 1;
  b = 2;
  c = this.a + this.b;

  // with signals
  a1 = signal(1);
  b1 = signal(2);
  c1 = computed(() => this.a1() + this.b1());
}
understandSignalUsageWithExample() {
  // without signals
  console.log('c before value change: ', this.c);
  this.a = 4;
  console.log('c after value change: ', this.c);

  // with signals
  console.log('c1 before value change: ', this.c1());
  this.a1.set(4);
  console.log('c1 after value change: ', this.c1());
}

deleteCourse(course: Course) {
  // this.del.emit(course);
  this.courseService.deleteCourse(course);
}

