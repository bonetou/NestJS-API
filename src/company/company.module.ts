import { HttpModule, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './database/mongo/schemas/company.schema'
import { Partner, PartnerSchema } from './database/mongo/schemas/partner.schema'
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Company.name, schema: CompanySchema },
        { name: Partner.name, schema: PartnerSchema }
      ]),
    MongooseModule.forRoot('mongodb://test:test@localhost:27017'),
    HttpModule.register({
      baseURL: 'https://api.brasil.io/v1/dataset/socios-brasil/',
      timeout: 5000,
      headers: {
        Authorization: process.env.AUTH_TOKEN
      }
    })],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }
