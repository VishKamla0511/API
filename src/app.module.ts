import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as SCHEMA from 'src/db/schema'
require('dotenv').config()

@Module({
  imports: [ProductsModule, DrizzlePostgresModule.registerAsync({
    tag: 'PRODUCT',
    useFactory() {
      return {
        postgres: {
          url: process.env.DB_URL,
        },
        config: { schema: SCHEMA },
      }
    }
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
