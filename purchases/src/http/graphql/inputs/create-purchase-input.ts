import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class CreatePurchaseInput {
  @Field()
  productId: string;
}
