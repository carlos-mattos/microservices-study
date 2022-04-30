import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export default class Product {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;
}
