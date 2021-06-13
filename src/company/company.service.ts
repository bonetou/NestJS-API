import { HttpService, Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyResponse, Partner, PartnerResponse } from './interfaces/apiResponse.interface';
import { CompanyInterface } from './interfaces/company.interface';
import { Company } from './schemas/company.schema';

@Injectable()
export class CompanyService {
    constructor(
        @InjectModel(Company.name) private companyModel: Model<Company>,
        private httpService: HttpService) { }

    async findCompany(cpnj: string): Promise<CompanyInterface> {
        const urlCompany = 'empresas/data/?cnpj=' + cpnj
        const urlPartners = 'socios/data/?cnpj=' + cpnj
        const companyResponse = (await this.httpService.get<CompanyResponse>(urlCompany).toPromise()).data
        const partnersResponse = (await this.httpService.get<PartnerResponse>(urlPartners).toPromise()).data
        const data: CompanyInterface = {
            ...companyResponse.results[0],
            qsa: partnersResponse.results.map(partner => {
                return {
                    cpf_cnpj_socio: partner.cpf_cnpj_socio,
                    nome_socio: partner.nome_socio,
                    qualificacao_socio: partner.qualificacao_socio,
                    tipo_socio: partner.tipo_socio
                }
            })
        }
        return data
    }
    async findCompanyOnDatabase(cnpj: string): Promise<any> {
        const result = await this.companyModel.find({ cnpj: cnpj }).select('-_id')
        return result
    }

    async createCompany(company) {
        const createdCompany = new this.companyModel(company)
        const result = await createdCompany.save()
    }

    async updateCompanyOnDatabase(company) {
        const doc = await this.companyModel.findOneAndUpdate({ cnpj: company.cnpj }, company)
        await doc.save()
    }
}
