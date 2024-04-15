import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-sql')
  async generateSql(
    @Body() body: { text: string },
  ) {
    return await this.appService.generateSql(body.text);
  }
}
