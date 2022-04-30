import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateCourseInput {
  @Field()
  title: string;
}
