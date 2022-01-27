import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './modules/backoffice/backoffice.module';
import 'dotenv/config'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
