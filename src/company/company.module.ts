import { HttpModule, Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema'
import { Partner, PartnerSchema } from './schemas/partner.schema'

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: Company.name, schema: CompanySchema },
        { name: Partner.name, schema: PartnerSchema }
      ]),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo:27017/`),
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
