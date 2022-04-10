import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Resolver()
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  getHello() {
    return 'hello world from resolver graphql';
  }
}
