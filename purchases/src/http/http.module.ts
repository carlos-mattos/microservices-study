import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/database/database.module';
import { ProductsResolver } from 'src/http/graphql/resolvers/products.resolver';
import path from 'node:path';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import ProductsService from 'src/services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import PurchasesService from 'src/services/purchases.service';
import CustomersService from 'src/services/customers.service';
import { CustomerResolver } from './graphql/resolvers/customer.resolver';
import { MessagingModule } from '../messaging/messaging.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
    MessagingModule,
  ],
  providers: [
    // resolvers
    ProductsResolver,
    PurchasesResolver,
    CustomerResolver,

    // services
    ProductsService,
    PurchasesService,
    CustomersService,
  ],
})
export class HttpModule {}
