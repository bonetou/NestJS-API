import { PartnerInterface } from "./partner.interface"

export interface CompanyInterface {
    cnpj: string;
    razao_social: string;
    uf: string;
    qsa: PartnerInterface[]
}
