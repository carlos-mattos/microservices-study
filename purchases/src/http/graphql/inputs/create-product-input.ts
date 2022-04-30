import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreateProductInput {
  @Field()
  title: string;
}
