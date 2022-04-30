import { Field, ObjectType } from '@nestjs/graphql';
import Course from './course';
import Student from './student';

@ObjectType()
export default class Enrollment {
  @Field()
  id: string;

  @Field(() => Student)
  student: Student;

  @Field()
  studentId: string;

  @Field(() => Course)
  course: Course;

  @Field()
  courseId: string;

  @Field(() => Date, { nullable: true })
  canceledAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
