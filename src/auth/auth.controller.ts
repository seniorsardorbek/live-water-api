import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CustomRequest } from 'src/_shared/response'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { IsLoggedIn } from './is-loggin.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data)
  }

  @UseGuards(IsLoggedIn)
  @Get()
  verifyMe(@Req() req: CustomRequest) {
    return this.authService.verifyWithToken(req)
  }
}
