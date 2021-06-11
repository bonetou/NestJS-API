interface Company {
    cnpj: string;
    razao_social: string;
    uf: string;
}

export interface BaseResponse<T> {
    count: Number,
    next: any,
    previous: any,
    results: T[]
}

export interface Partner {
    cpf_cnpj_socio: string;
    nome_socio: string;
    qualificacao_socio: string;
    tipo_socio: string;
}

export interface CompanyResponse extends BaseResponse<Company> {
}

export interface PartnerResponse extends BaseResponse<Partner> {
}

