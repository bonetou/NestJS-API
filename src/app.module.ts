import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CompanyModule } from './company/company.module';
import { ConfigService } from 'nestjs-dotenv';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CompanyModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule { }
