import { Field, ObjectType } from '@nestjs/graphql';
import Enrollment from './enrollment';

@ObjectType()
export default class Student {
  @Field()
  id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
