import { Component, Input, Output, input, inject } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { CourseService } from '../../services/course/course.service';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  // @Input() course: any;
  // @Input() isDelete = false;
  // @Output() del = new EventEmitter();

  // courseService = inject(CourseService);

  isAdmin = input<boolean>(false);
  courseService = inject(CourseService);
  
  ngOnInit() {
    // this.understandSignalUsageWithExample();
    // this.courses = this.courseService.getCourses();
    // this.courses.set(this.courseService.getCourses());
    // this.getCourses();
    // this.coursesSub = this.courseService.courses.subscribe({
    //   next: (courses) => {
    //     this.courses = courses;
    //     console.log('courses: ', this.courses);
    //     this.courses.set(courses);
    //     console.log('courses: ', this.courses());
    //   },
    //   error: (e) => {
    //     console.log(e);
    //   }
    // });
  }

  deleteCourse (course: Course){
    // this.del.emit(this.course)
    this.courseService.deleteCourse(course);
  }

}
