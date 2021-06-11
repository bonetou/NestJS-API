import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
    @Prop()
    cpf_cnpj_socio: string;

    @Prop()
    nome_socio: string;

    @Prop()
    qualificacao_socio: string;

    @Prop()
    tipo_socio: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);