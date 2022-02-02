import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { Guid } from 'guid-typescript';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { AuthService } from 'src/shared/services/auth.service';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';
import { LoginDto } from '../dtos/account/login.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Result } from '../models/result.model';
import { AccountService } from '../services/account.service';

@Controller('v1/accounts')
export class AccountController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ){}
  
  @Post('login')
  async login(@Body() model: LoginDto): Promise <any>{
    const customer = await this.accountService.login(model.username, model.password);
    
    if(!customer)
    throw new HttpException(new Result('Usuário ou senha invalido!', null, false, null), HttpStatus.UNAUTHORIZED);
    
    if(!customer.user.active)
    throw new HttpException(new Result('O usuário não está ativo', null, false, null), HttpStatus.UNAUTHORIZED);
    
    const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles)
    return new Result(null, token, true, null);
  }

  @Post('reset')
  async resetPassword(@Body() model: ResetPasswordDto): Promise<any>{
    try{
      //enviar email com nova senha.
      const password = Guid.create().toString().substring(0, 8).replace('-', '');
      await this.accountService.update(model.document, {password: password});
      return new Result('Nova senha enviada para o email cadastrado', null, true, null)
    }
    catch(error){
      throw new HttpException(new Result('Não foi possível restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }

  @Post('change')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
    try {
      await this.accountService.update(request.user.document, { password: model.newPassword });
      return new Result('Sua senha foi alterada com sucesso!', true, null, null);
    } catch (error) {
      throw new HttpException(new Result('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Req() request): Promise<any> {
    const token = await this.authService.createToken(request.user.document, request.user.email, request.user.image, request.user.user.roles);
    return new Result(null, token, true,  null);
  }
}
