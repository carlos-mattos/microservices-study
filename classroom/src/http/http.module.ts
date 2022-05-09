import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import path from 'node:path';
import { ApolloDriver, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import CourseResolver from './graphql/resolvers/courses.resolver';
import EnrollmentsResolver from './graphql/resolvers/enrollments.resolver';
import StudentResolver from './graphql/resolvers/students.resolver';
import CoursesService from 'src/services/courses.service';
import EnrollmentsService from 'src/services/enrollments.service';
import StudentsService from 'src/services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // resolvers
    CourseResolver,
    EnrollmentsResolver,
    StudentResolver,

    // services
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
