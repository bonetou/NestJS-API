import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { cachedto } from './dto/cachedto';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
    constructor(private CompanyService: CompanyService) { }

    @Get(':cnpj/:tipo_consulta')
    async companyAndPartners(@Param('cnpj') cnpj: string, @Param('tipo_consulta') tipo_consulta: cachedto) {
        if (tipo_consulta == cachedto.CACHEADO) {
            // get banco 
            // hasData 
            return undefined
        }
        const response = await this.CompanyService.findCompany(cnpj)
        // salva no banco 
        return response;
    }
}
