import { HttpException, HttpStatus } from "@nestjs/common";


export const HttpExceptionNotFound = () => new HttpException({
  status: HttpStatus.NOT_FOUND,
  error: "Dados não encontrados para essa empresa",
}, HttpStatus.NOT_FOUND)