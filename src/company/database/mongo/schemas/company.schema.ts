import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Partner } from './partner.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop()
  cnpj: string;

  @Prop()
  razao_social: string;

  @Prop()
  uf: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }] })
  qsa: Partner[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);