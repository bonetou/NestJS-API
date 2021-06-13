import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { cachedto } from './dto/cachedto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get(':cnpj/:tipo_consulta')
    async companyAndPartners(@Param('cnpj') cnpj: string, @Param('tipo_consulta') tipo_consulta: cachedto) {
        const companyFoundOnDatabase = await this.companyService.findCompanyOnDatabase(cnpj)
        const existsCompanyOnDatabase = companyFoundOnDatabase.length > 0 ? true : false

        if (tipo_consulta == cachedto.CACHEADO) {
            if (existsCompanyOnDatabase) {
                return companyFoundOnDatabase
            }
            const response = await this.companyService.findCompany(cnpj)
            await this.companyService.createCompany(response)
            return response
        }

        const response = await this.companyService.findCompany(cnpj)
        if (existsCompanyOnDatabase) {
            await this.companyService.updateCompanyOnDatabase(response)
            return response;
        }
        this.companyService.createCompany(response)
        return response

    }
}
