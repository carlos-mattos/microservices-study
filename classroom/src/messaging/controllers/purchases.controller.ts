import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import CoursesService from 'src/services/courses.service';
import EnrollmentsService from 'src/services/enrollments.service';
import StudentsService from 'src/services/students.service';

interface Customer {
  authUserId: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
}

interface PayloadPurchase {
  customer: Customer;
  product: Product;
}

@Controller()
export default class PurchasesController {
  constructor(
    private studentsService: StudentsService,
    private coursesServices: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: PayloadPurchase) {
    let student = undefined
    // await this.studentsService.getStudentByAuthUserId(
    //   payload.customer.authUserId,
    // );

    if (!student) {
      student = await this.studentsService.create({
        authUserId: payload.customer.authUserId,
      });
    }

    let course = await this.coursesServices.getCourseBySlug(
      payload.product.slug,
    );

    if (!course) {
      course = await this.coursesServices.createCourse({
        title: payload.product.title,
      });
    }

    await this.enrollmentsService.create({
      courseId: course.id,
      studentId: student.id,
    });
  }
}
