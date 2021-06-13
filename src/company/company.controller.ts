import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { cachedto } from './dto/cachedto';
import { ParamsDto } from './dto/paramsDto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Get(':cnpj/:tipo_consulta')
    async companyAndPartners(
        @Param() params: ParamsDto) {

        const companyFoundOnDatabase = await this.companyService.findCompanyOnDatabase(params.cnpj)
        const existsCompanyOnDatabase = companyFoundOnDatabase.length > 0

        if (params.tipo_consulta == cachedto.CACHEADO) {
            if (existsCompanyOnDatabase) {
                return companyFoundOnDatabase
            }
            const response = await this.companyService.findCompany(params.cnpj)
            if (response) {
                await this.companyService.createCompany(response)
                return response
            }
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "Dados não encontrados para essa empresa",
            }, HttpStatus.NOT_FOUND)
        }

        const response = await this.companyService.findCompany(params.cnpj)
        if (response) {
            if (existsCompanyOnDatabase) {
                await this.companyService.updateCompanyOnDatabase(response)
                return response;
            }
            this.companyService.createCompany(response)
            return response
        }
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: "Dados não encontrados para essa empresa",
        }, HttpStatus.NOT_FOUND)


    }
}
