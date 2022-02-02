import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AuthService } from 'src/shared/services/auth.service';

@Controller('v1/accounts')
export class AccountController {
  constructor(
      private readonly authService: AuthService
  ){}
  
  @Post()
  async CreateToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async finAll(): Promise<any> {
    return 'Você está autenticado.'
  }
}