import { ApiProperty } from "@nestjs/swagger";
import { Contains, IsEnum, IsIn } from "class-validator";
import { IsCNPJ } from "../validators/cnpj.validator";
import { cachedto } from "./cachedto";


export class ParamsDto {
    @ApiProperty()
    @IsCNPJ({message: "CNPJ inválido"})
    cnpj: string
    
    @ApiProperty({
        enum : cachedto,
        default : cachedto.TEMPO_REAL
    })
    @IsIn(
        [cachedto.CACHEADO, cachedto.TEMPO_REAL],
        {message: "Tipo de consulta deve ser cacheado ou tempo_real"}
    )
    tipo_consulta: string
}