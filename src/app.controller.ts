import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IsString } from 'class-validator';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

class GenerateSqlDto {
  @ApiProperty()
  @IsString()
  text: string;
}
@ApiTags('Generate SQL')
@Controller('')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-sql')
  async generateSql(@Body() body: GenerateSqlDto) {
    if (!body.text) {
      throw new BadRequestException('O campo "text" é obrigatório');
    }
    return await this.appService.generateSql(body.text);
  }
}
